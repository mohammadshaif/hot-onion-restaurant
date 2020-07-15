import React, { useState } from 'react';

import './CheckOutFrom.css'
//import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../auth/useAuth';
import { useContext } from 'react';


const CheckoutForm = (props) => {
const {checkOutOrder} = useContext(UserContext)
      //my code
  const [paymentError, setPaymentError] = useState(null);
  const [paymentFinished, setPaymentFinished]= useState(null);


  const stripe = useStripe();
  const elements = useElements();

const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    //console.log("stripe integrated" ,error, paymentMethod);
    //my code
    if (error) {
        setPaymentError(error.message);
        setPaymentFinished(null)
    }else{
        setPaymentFinished(paymentMethod);
        const payment = {id: paymentMethod.id, last4: paymentMethod.card.last4}
        props.handlePlaceOrder(payment);
       setPaymentError(null)
    }


  };

  // function refreshPage() {
  //   checkOutOrder()

  //   // setTimeout(() => {
  //   //     window.location.reload(false);
  //   // }, 8000);
  //  props.history.push('checkout')
  // }


  return (
    
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className='payBtn' disabled={!stripe}>
        Pay
      </button>
      {
          paymentError && <p style={{color:'red'}} > {paymentError} </p>
      }
      {
          paymentFinished && <p style={{color:'green',fontSize: '20px'}} > Payment Successful</p>
      }
    </form>
  );
};
export default withRouter (CheckoutForm);