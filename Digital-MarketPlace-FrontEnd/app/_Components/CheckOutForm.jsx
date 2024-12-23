'use client'
import React, { useEffect } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { CartStore } from "../_zustand/CartStore";
import { useUser } from "@clerk/nextjs";
import Order_API from "../_utils/Order_API";
import { useRouter } from "next/navigation";
export default function CheckOutForm({ amount }) {
    const router = useRouter()
    const { cart, Total,cleanCart } = CartStore()
    const { user } = useUser()
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [clientSecret, setClientSecret] = React.useState("");

    useEffect(() => {
        fetch("/api/create-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: amount })
        }).then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))

    }, [amount])

    const handleSubmit = async (e) => {
        e.preventDefault();
        createOrder_()

        setIsLoading(true)
        if (!clientSecret || !stripe || !elements) return;

        setIsLoading(true);

        const { error: submitError } = await elements.submit()
        if (submitError) {
            setErrorMessage(submitError.message);
            setIsLoading(flase);
            return;
        }
        const { error } = await stripe.confirmPayment({
            clientSecret: clientSecret,
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/payment-confirm",
            },
        });

        if (error)
            setErrorMessage(error.message);
        else if (paymentIntent && paymentIntent.status === 'succeeded') {
            await createOrder_();
            console.log('Payment succeeded:', paymentIntent);
        }



        setIsLoading(false);
    };
    const createOrder_ = () => {
        const productsIDS = cart.map((item) => item?.product?.documentId);

        const data = {
            data: {
                email: user.primaryEmailAddress.emailAddress,
                username: user.fullName,
                amount: Math.round(Total),
                products: productsIDS
            }
        }
        Order_API.createOrder(data).then(res => {
            cleanCart()
        })
    }

    return (
        <form onSubmit={handleSubmit} >
            {
                clientSecret && <PaymentElement />
            }

            <button className="w-full p-3 mt-3 text-white rounded-lg bg-stone-900" disabled={!stripe || isLoading}>

                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}

            </button>

            {errorMessage && <div>{errorMessage}</div>}

        </form>
    )
}