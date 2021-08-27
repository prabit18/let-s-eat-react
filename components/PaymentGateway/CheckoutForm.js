import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';

export default function CheckoutForm({orderId}) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const stripeTokenHandler= async(token)=> {
        const paymentData = {token: token.id};
      
        // Use fetch to send the token ID and any other payment data to your server.
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const response = await fetch('https://staging-apis.letseat.co.uk/staging/api/v1/orders/web/validate-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderId),
        });
      
        // Return and display the result of the charge.
        console.log("response token",response.json());
        return response.json();
      }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      stripeTokenHandler(result.token);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}