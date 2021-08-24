import React from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.

const PaymentGateway=({StripPublicKey,orderId})=> {
  console.log({StripPublicKey})
  // const [stripePromiseAll, setstripePromise] = useState(localStorage.getItem('Public_key'))
  const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm orderId={orderId}/>
    </Elements>
  );
};
export default PaymentGateway;
