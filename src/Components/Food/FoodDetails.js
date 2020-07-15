import React, { useState, useEffect, useContext } from 'react';
import './FoodDetails.css'
import { useParams, Link } from 'react-router-dom';
//import foods from '../../fakeData/foodData';
import { UserContext } from '../auth/useAuth';
import Loading from './Loading';

const FoodDetails = (props) => {
  const {addToCart } = useContext(UserContext)
  const {id} = useParams()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(()=>{
    setIsLoading(true);
    fetch('https://secret-tundra-37169.herokuapp.com/food/'+id)
    .then(response => response.json())
    .then(data => {
      setProduct(data)
      setIsLoading(false)
    })
},[])
//  useEffect(()=>{
//     const data = foods.filter(item => item.id === parseInt(pdId.id))
//     setProduct(data[0])
//   },[pdId])

  // useEffect(()=>{
  //   const data = foods.filter(item => item.id === parseInt(pdId.id))
  //   setProduct(data[0])
  // },[pdId])

  // onchange handler
  const onchangeHandler = e => {
    if(!isNaN(e.target.value)) {
      setQuantity(e.target.value)
    }
  }

  console.log(product);
  
  const cartHandler = item => {
    // console.log(id);
    
    addToCart({...item, quantity})
    props.history.push('/cart')
  }

  const quantityHandler = quan => {
    if(quantity < 0 || quantity === 0) {
      setQuantity(0)
    } else {
      setQuantity(quantity-quan)
    }
  }
  // console.log(product.title);  
  if (isLoading) {
    return <Loading />
  }
  return (
    <>
    {product ? (
    <section className="food-details pt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 py-5">
            <div className="food-details-content">
              <h3>{product && product.title}</h3>
              <p className="subtitle muted pt-3">{product && product.description}</p>
            <div className="cart-item d-flex align-items-center p-3">
              <h3>${product && product.price}</h3>
              <div className="input-group input-cart-item ml-4">
                <button 
                  className="btn btn-default" 
                  onClick={()=>quantityHandler(1)}
                  id="remove-product"><i className="fas fa-minus"></i></button>
                <input type="text" 
                  id="food-quantity" 
                  onChange={onchangeHandler} 
                  className="form-control text-center" 
                  value={quantity} />
                <button 
                  onClick={()=>setQuantity(quantity*1 +1)}
                  className="btn btn-default" 
                  id="add-product"><i className="fas fa-plus"></i></button>
              </div>
            </div>
            <button className="btn primary-btn btn-cart" onClick={()=>cartHandler(product)}>
              <span>
                <i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
              </span> Add</button>
            </div>
          </div>
          <div className="col-md-6 m-auto d-block">
            <img src={product && product.img} className="food-img m-auto d-block" alt=""/>
          </div>
        </div>
      </div>
    </section>
  )
    : (
      <div className="container  not-found-aria">
        <div className="row ">
          <div className="col not-found-content text-center">
            <h1>Invalid Product data</h1>
            <h3>Something went wrong</h3>
            <p>We're deeply sorry, there are no product about this data</p>
            <Link to="/foods">See our foods.</Link>
          </div>
        </div>
      </div>
    )
  }
    </>
  );
};

export default FoodDetails;