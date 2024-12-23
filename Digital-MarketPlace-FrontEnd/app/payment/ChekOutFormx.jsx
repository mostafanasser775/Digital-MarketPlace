'use client'
import React, { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { CartStore } from "../_zustand/CartStore";

export default function CheckOutFormx({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/api/create-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount })
    }).then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))

  }, [amount])


  const handleSubmit = async (event) => {
    event.preventDefault();

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
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    })

    // if (error.type === "card_error" || error.type === "validation_error") {
    //     setMessage(error.message);
    // } else {
    //     setMessage("An unexpected error occurred.");
    // }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto mt-5 w-96">
        {
          clientSecret && <PaymentElement />
        }
        <button disabled={isLoading || !stripe || !elements} id="submit" className="w-full p-3 mt-4 text-white rounded-lg bg-slate-900">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {errorMessage && <div id="payment-message">{errorMessage}</div>}
      </form>

    </>
  );
}