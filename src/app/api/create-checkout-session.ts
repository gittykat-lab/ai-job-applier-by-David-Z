import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { plan, userId } = req.body

      // Fetch or create a Stripe customer for this user
      let customer = await getOrCreateStripeCustomer(userId)

      // Set the price based on the selected plan
      const priceId = plan === 'monthly' 
        ? process.env.STRIPE_MONTHLY_PRICE_ID 
        : process.env.STRIPE_YEARLY_PRICE_ID

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled`,
      })

      res.status(200).json({ sessionId: session.id })
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

async function getOrCreateStripeCustomer(userId: string): Promise<Stripe.Customer> {
  // Implement this function to fetch or create a Stripe customer
  // This is a placeholder - you need to implement this based on your user management system
  let customer: Stripe.Customer

  // Check if the user already has a Stripe customer ID
  const user = await getUserFromDatabase(userId)
  if (user.stripeCustomerId) {
    customer = await stripe.customers.retrieve(user.stripeCustomerId) as Stripe.Customer
  } else {
    // Create a new customer
    customer = await stripe.customers.create({
      metadata: {
        userId: userId,
      },
    })
    // Save the Stripe customer ID to your user in the database
    await updateUserInDatabase(userId, { stripeCustomerId: customer.id })
  }

  return customer
}

async function getUserFromDatabase(userId: string) {
  // Implement this function to fetch user data from your database
  // This is a placeholder
  console.log(`Fetching user ${userId} from database`)
  return { id: userId, stripeCustomerId: null }
}

async function updateUserInDatabase(userId: string, data: any) {
  // Implement this function to update user data in your database
  // This is a placeholder
  console.log(`Updating user ${userId} in database with data:`, data)
}
