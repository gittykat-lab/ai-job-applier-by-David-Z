import { buffer } from 'micro'
import Stripe from 'stripe'
import { NextApiRequest, NextApiResponse } from 'next'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
})

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

export const config = {
  api: {
    bodyParser: false,
  },
}

async function updateUserSubscription(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string
  const subscriptionId = session.subscription as string

  // Fetch the subscription details
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  // Here, update your database with the new subscription status
  // This is a placeholder function - you need to implement this based on your database structure
  await updateUserInDatabase(customerId, {
    subscriptionId: subscriptionId,
    subscriptionStatus: subscription.status,
    subscriptionPlan: subscription.items.data[0].price.id,
    subscriptionCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
  })
}

async function updateUserInDatabase(customerId: string, subscriptionData: any) {
  // Implement this function to update your database
  // For example, if you're using MongoDB with Mongoose:
  /*
  await User.findOneAndUpdate(
    { stripeCustomerId: customerId },
    { 
      $set: {
        subscriptionId: subscriptionData.subscriptionId,
        subscriptionStatus: subscriptionData.subscriptionStatus,
        subscriptionPlan: subscriptionData.subscriptionPlan,
        subscriptionCurrentPeriodEnd: subscriptionData.subscriptionCurrentPeriodEnd,
      }
    },
    { new: true }
  )
  */
  console.log(`Updating user ${customerId} with subscription data:`, subscriptionData)
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case 'checkout.session.completed':
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            await updateUserSubscription(checkoutSession)
            break
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription
            await updateUserInDatabase(subscription.customer as string, {
              subscriptionId: subscription.id,
              subscriptionStatus: subscription.status,
              subscriptionPlan: subscription.items.data[0].price.id,
              subscriptionCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            })
            break
          default:
            throw new Error('Unhandled relevant event!')
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Webhook handler failed' })
        return
      }
    }

    res.json({ received: true })
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
