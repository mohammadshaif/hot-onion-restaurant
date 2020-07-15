import React, { useState, useEffect } from 'react';
//import foods from '../../fakeData/foodData';
import FoodItem from '../Food/FoodItem';
import Loading from '../Food/Loading';

const Foods = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
    setIsLoading(true);
    fetch('https://secret-tundra-37169.herokuapp.com/foods/')
    .then(response => response.json())
    .then(data => {
      setItems(data)
      setIsLoading(false)
    })
},[])
if (isLoading) {
  return <Loading />
}
  // useEffect(() => {
  //     setItems(foods)
  // }, [])
  return (
    <div className="container">
      <div className="row food-items">
      {items.map(item => <FoodItem key={item.id} food={item} />)}
    </div>
    </div>
  );
};

export default Foods;