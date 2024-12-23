'use client'

import React from 'react'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSearchParams } from 'next/navigation';
import CheckOutFormx from './ChekOutFormx';
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY
);

export default function Payment() {
    const searchparams = useSearchParams()

    const amount = Number(searchparams.get('amount'));

    return (
        <div className='max-w-6xl p-10 mx-auto mt-5 text-center text-white rounded bg-gradient-to-tr from-blue-500 to-purple-500'>

            {
                amount && <Elements stripe={stripePromise} options={{
                    mode: 'payment',
                    amount: amount,
                    currency: 'usd'
                }}>
                    <CheckOutFormx amount={amount} />
                </Elements>

            }


        </div>
    )
}