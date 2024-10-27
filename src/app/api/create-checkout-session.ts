import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-09-30.acacia',
})

// Define a type for the expected response
type CreateCheckoutSessionResponse = {
  sessionId: string;
} | {
  error: {
    message: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<CreateCheckoutSessionResponse>) {
  if (req.method === 'POST') {
    try {
      // Replace 'any' with a more specific type
      const { email, paymentType }: { email: string; paymentType: string } = req.body;

      // Fetch or create a Stripe customer for this user
      const customer = await getOrCreateStripeCustomer(email)

      // Set the price based on the selected plan
      const priceId = paymentType === 'monthly' 
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
    } catch (err) {
      // Replace 'any' with a more specific error type
      const error = err as Error;
      res.status(500).json({ error: { message: error.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

async function getOrCreateStripeCustomer(email: string): Promise<Stripe.Customer> {
  // Implement this function to fetch or create a Stripe customer
  // This is a placeholder - you need to implement this based on your user management system
  const customer: Stripe.Customer

  // Check if the user already has a Stripe customer ID
  const user = await getUserFromDatabase(email)
  if (user.stripeCustomerId) {
    customer = await stripe.customers.retrieve(user.stripeCustomerId) as Stripe.Customer
  } else {
    // Create a new customer
    customer = await stripe.customers.create({
      metadata: {
        email: email,
      },
    })
    // Save the Stripe customer ID to your user in the database
    await updateUserInDatabase(email, { stripeCustomerId: customer.id })
  }

  return customer
}

async function getUserFromDatabase(email: string) {
  // Implement this function to fetch user data from your database
  // This is a placeholder
  console.log(`Fetching user ${email} from database`)
  return { id: email, stripeCustomerId: null }
}

async function updateUserInDatabase(email: string, data: any) {
  // Implement this function to update user data in your database
  // This is a placeholder
  console.log(`Updating user ${email} in database with data:`, data)
}
