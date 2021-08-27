import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { dataService } from '../../services';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.

const PaymentGateway=({StripPublicKey,orderId,StripSecrete,paymentIntent,cards,stripeChargeFromCard})=> {
  const [chargeFromCard, setchargeFromCard] = useState(false)
  const handleCharge=(card)=>{
    setchargeFromCard(true)

    //  handleSubmit(card.payment_method)

  }
  function stripeChargeFromCard(paymentId){
    
    console.log("calling");
        const payment_method=paymentId.id
        const order_id=orderId
        dataService.ChargeSavedCards(payment_method,order_id).then((resp)=>{
            
                console.log('response-->charge success',resp)
                if(resp.error===false){
                  let response=resp.data.data.data
                  dataService.ValidatePayment(response.payment_intent_id,response.order_id).then((resp)=>{
                    if(resp){
                        console.log("Success card charge",resp)
                        alert("Order placed Successfully")
                        window.location.reload()
                    }
                })
                }
            
        })
    
    

}
  console.log({StripPublicKey})
  // const [stripePromiseAll, setstripePromise] = useState(localStorage.getItem('Public_key'))
  const stripePromise = loadStripe(StripPublicKey);
  return (
    <Elements stripe={stripePromise}>
            <br/>

      {cards.length>0&&cards.map((card)=>(
        <ul>
          <li key={card.id} onClick={()=>stripeChargeFromCard(card)} style={{cursor:"pointer"}}>{card.card.brand}-{card.card.last4}</li>
        </ul>
      ))}
            <br/>

      <CheckoutForm orderId={orderId} StripPublicKey={StripPublicKey} StripSecrete={StripSecrete} paymentIntent={paymentIntent} handleCharge={handleCharge} chargeFromCard={chargeFromCard}/>
    </Elements>
  );
};
export default PaymentGateway;
