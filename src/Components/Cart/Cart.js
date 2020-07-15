import React, { useContext, useState, useEffect } from 'react';
import { UserContext, useAuth } from '../auth/useAuth';
import InputItem from '../auth/InputItem/InputItem'
import './Cart.css'
import CartItem from './CartItem';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { withRouter, Link } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Cart = (props) => {
  const { cart, checkOutOrder } = useContext(UserContext)

  const [address, setAddress] = useState('')
  const [homeNo, setHomeNo] = useState('')
  const [flatNo, setFlatNo] = useState('')
  const [name, setName] = useState('')
  const [instruction, setInstruction] = useState('')
  const [deliveryFee] = useState(2)
  const [tax] = useState(5)
  const [subTotal, setSubTotal] = useState(5)

 // auth niye asa
  const auth = useAuth();
  //payment api connection
  const stripePromise = loadStripe('pk_test_qOETRaQu1nHAzMr0OTDTcP0S00n3tonp77');
  const [shipInfo, setShipInfo] = useState(null);
 const [orderId, setOrderId] = useState(null);

  
  useEffect(()=> {
      let totalPrice = cart.reduce( (total, item) => total + item.proTotalPrice , 0 )
    setSubTotal(totalPrice)
  },[cart])

  const [disabled, setDisabled] = useState(false)
  useEffect(()=> {
              if(name && homeNo && flatNo && instruction && address) {
                  setDisabled(false)
              } else {
                setDisabled(true)
              }
  },[address,homeNo,flatNo,name,instruction])

  // input field handler
  const onchangeHandler = e => {
    const { name, value } = e.target;
    if (name === 'address') {
      setAddress(value)
    }
    if (name === 'homeNo') {
      setHomeNo(value)
    }
    if (name === 'flatNo') {
      setFlatNo(value)
    }
    if (name === 'name') {
      setName(value)
    }
    if (name === 'instrunCiton') {
      setInstruction(value)
    }
  }
  const handlePlaceOrder = (payment) => {
  
    const order = {address:address,homeNo:homeNo,flatNo:flatNo}
    const orderDetails = { email: auth.user.email,
      order,cart:cart,
      shipment: shipInfo,
      payment: payment
     }
    console.log('oi beta',orderDetails);
      
    // checkOutOrder()
  
    // props.history.push('/checkout')
    fetch('https://secret-tundra-37169.herokuapp.com/placeOrder', {
              method: 'POST',
              body: JSON.stringify(orderDetails),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
            .then(response => response.json())
            .then(order => {
              //setOrderId(order._id);
                console.log('order Placed', order)
                
               // checkOutOrder()
                setOrderId(order._id);
                  // clearLocalShoppingCart();
                
              });
  }
  
// if(cart.length === 0) {
//   return (
//     <div className="container pt-5 mt-5 text-center">
//       {/* <h1 className="text-center">You have no item</h1>
//         <Link to="/foods" className="text-danger">See our foods.</Link> */}
//         <div className="row">
//           <div className="col-md-4">
//               <div  style={{ marginTop: '200px' }} 
//                 >
//                 <h3>Payment Information</h3>
//                 <Elements stripe={stripePromise}>
//                     <CheckoutForm handlePlaceOrder={handlePlaceOrder} ></CheckoutForm>
//                 </Elements>
//                 <br/>
//                 {
//                             orderId && <div>
//                                 <h3>Thank you for shopping with us</h3>
//                                 <p>Your order id is: {orderId}</p>
//                             </div>
//                         }
//             </div>
//           </div>
//         </div>
         
//     </div>
//   )
// }
const handleCheckout = () => {
  setShipInfo(true)
}

//const auth = UserContext();



const handleSubmit = e => {
  e.preventDefault()
  
}

  return (
    <div className="container pt-5 mt-5">
      <div className="row d-flex justify-content-between">
        <div className="col-md-5"  style={{display: shipInfo && 'none' }}>
          <div className="delivery-details">
            <h3>Edit Delivery Details </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <InputItem name="address"
              type="text" placeholder="Deliver to door"
              onchangeHandler={onchangeHandler} value={address} />
            <InputItem name="homeNo"
              type="text" placeholder="107 RD No 12"
              onchangeHandler={onchangeHandler} value={homeNo} />
            <InputItem name="flatNo"
              type="text" placeholder="Flat, suite or flor"
              onchangeHandler={onchangeHandler} value={flatNo} />
            <InputItem name="name"
              type="text" placeholder="Business Name "
              onchangeHandler={onchangeHandler} value={name} />
            <div className="form-group">
              <textarea className="form-control"
                onChange={onchangeHandler}
                value={instruction}
                name="instrunCiton"
                placeholder="Add Delivery Instruction " rows="3"></textarea>
            </div>
            {/* <button  type="submit" className="btn sign-up-btn w-100">Save and Continue</button> */}
          </form>
        </div>
        <div className="col-md-5 "  style={{display: shipInfo && 'none' }}>
          <div className="final-order-aria">
            <h5 className="resturant-name">From <span>Gulshan Plazza GPR</span> </h5>
            <h6>Arriving in 20-30 minutes</h6>
            <div className="orders-items-aria">

              {cart.map(item => <CartItem item={item} key={item.id} />)}

            </div>
            <div className="order-price-aira">
              <div className="cart-item">
                <div className="row">
                  <div className="col-md-8">
                    <h5>Subtotal: </h5>
                    <h5>Tax:</h5>
                    <h5>Deliver fee:</h5>
                    <h5>Total:</h5>
                  </div>
                  <div className="col-md-4 status">
                    <h5>$ <span id="sub-total-price">{subTotal.toFixed(2)}</span> </h5>
                    <h5>$ <span> {tax}.00</span> </h5>
                    <h5>$ <span>{deliveryFee}.00</span> </h5>
                    <h5>$ <span id="total-price">{(subTotal+tax+deliveryFee).toFixed(2)}</span> </h5>
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={disabled} 
                  className={disabled ? 'btn place-order-btn-disable': 'btn sign-up-btn w-100'} 
                  // className="btn sign-up-btn w-100" 
                  onClick={handleCheckout} >Place Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
     
          <div className="col-md-5"
                style={{ marginTop: '100px', display: shipInfo ? 'block' : 'none' }} 
                >
                <h3>Payment Information</h3>
                <Elements stripe={stripePromise}>
                    <CheckoutForm handlePlaceOrder={handlePlaceOrder} ></CheckoutForm>
                </Elements>
                <br/>
                        {
                            orderId && <div>
                                <h3>Thank you for shopping with us</h3>
                                <p>Your order id is: {orderId}</p>
                                <img src="https://i.ibb.co/NytGHH3/8-ordercomplete.png" className="w-100" alt="8-ordercomplete" border="0"></img>

                            </div>
                        }
            </div>
          </div>
      
      
    
  );
};

export default withRouter(Cart);