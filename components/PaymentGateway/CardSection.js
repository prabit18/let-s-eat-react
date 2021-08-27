import React from 'react';
import {CardElement} from '@stripe/react-stripe-js';
// import '../../styles/css/./Styles.css'
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
function CardSection({handleSavecard,saveCard}) {
  return (
    <label>
      Card details
      <div style={{width:"400px"}}><CardElement options={CARD_ELEMENT_OPTIONS}  />
     
      <input type="checkbox" onChange={(e)=>handleSavecard(e)} checked={saveCard===true}/> <label>save this card </label>
          </div>
    </label>
  );
};
export default CardSection;