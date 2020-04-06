import React from 'react';
//import fakeData from '../../fakeData/foodData';
 import { chooseData } from '../../fakeData/foodData';

const Inventory = () => {
    
    const handleAddInventory= ()=>{
        
        //post
        const product = chooseData[0]
        console.log('before post',product);
        fetch('https://secret-tundra-37169.herokuapp.com/addChooseData/', {
            method: 'POST',
            body: JSON.stringify(chooseData),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.json())
          .then(data => console.log('post successful',data))
    }

    return (
        <div>
            <h1>Inventory coming soon...</h1>
            <button onClick={handleAddInventory} >Add Inventory</button>
        </div>
    );
};

export default Inventory;