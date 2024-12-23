'use client'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../_Components/CheckoutForm';
import { useSearchParams } from 'next/navigation';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY)
export default function Checkout() {
    const searchparams = useSearchParams();
    return (
        <div className='mx-auto mt-5 w-96'>
        <Elements stripe={stripePromise} options={{
            mode: 'payment',
        currency: 'usd',
        amount: Number(searchparams.get('amount'))
        }}>
            <CheckoutForm amount={Number(searchparams.get('amount'))} />
        </Elements>
        </div>)
}

