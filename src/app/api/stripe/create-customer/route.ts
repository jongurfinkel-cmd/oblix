import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const { email, userId } = await req.json();

  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  return NextResponse.json({ customerId: customer.id });
}
