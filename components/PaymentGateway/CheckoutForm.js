import React,{useState} from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import { dataService } from '../../services';

export default function CheckoutForm({orderId,StripPublicKey,StripSecrete,paymentIntent,handleCharge,chargeFromCard}) {
  const stripe = useStripe();
  const elements = useElements();
const [saveCard, setsaveCard] = useState('')
  const handleSavecard=(e)=>{
    setsaveCard(e.target.checked)
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    
   
    async function stripeTokenHandler (token) {       
        let bodyPayload={
            payment_method: {
                card: elements.getElement(CardElement)
              }

        } 
        if(saveCard===true){
            // bodyPayload.setup_future_usage='off_session'
            bodyPayload['setup_future_usage'] = 'off_session'
          }
        //   console.log("bodyPayload",bodyPayload)
          const payload = await stripe.confirmCardPayment(StripSecrete, bodyPayload);
          
          if (payload.error) {
            console.log("payload",payload.error);
          } else {
            console.log("payload.paymentMethod",payload.paymentMethod);
            dataService.ValidatePayment(paymentIntent,orderId).then((resp)=>{
                if(resp){
                    console.log("Success",resp)
                    alert("Order placed Successfully")
                }
            })
          }
        
        // Return and display the result of the charge.
        console.log("response token",payload);
        // return response.json();
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
      <CardSection  handleSavecard={handleSavecard} saveCard={saveCard}/>
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}