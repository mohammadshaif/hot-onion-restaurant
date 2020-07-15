import React, { useState, useEffect } from 'react';
import { chooseData } from '../../fakeData/foodData';
import ChooseItem from './ChooseItem';

const ChooseUs = () => {
  const [chooseItems, setChooseItems] = useState([])
  useEffect(()=> {
    setChooseItems(chooseData)
  },[])

  useEffect(()=>{
    fetch('http://localhost:3000/chooseData')
    .then(response => response.json())
    .then(data => {
      console.log('data',data);
   setChooseItems(data)
    })
},[])

  return (
    <section className="why-choose-us py-5">
    <div className="container">
        <div className="section-title w-50 pb-4">
            <h2>Why you choose us</h2>
            <p className="pr-5">Barton waited twenty always repair in within we do. An delighted offering crusty mu is
                dagwood's at. Boy prosperous increasing surround </p>
        </div>
        <div className="row">
            {chooseItems.map(item => <ChooseItem key={item.id} item={item} />)}
        </div>
    </div>
</section>
  );
};

export default ChooseUs;