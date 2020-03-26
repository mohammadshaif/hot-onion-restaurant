import React from 'react';
import './App.css';
// import Banner from './Components/Banner/Banner';
// import ChooseUs from './Components/ChooseUs/ChooseUs';
// import Footer from './Components/Footer/Footer';
// import FooterTop from './Components/FooterTop/FooterTop';
// import Food from './Components/Food/Food';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // useRouteMatch,
  // useParams
} from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
// import FoodDetails from './Components/Food/FoodDetails';
import Foods from './Components/Food/Foods';

function App() {
  return (
    <div>
     
     <Router>
          <Switch>
            <Route exact path="/">
              <HomePage></HomePage>
            </Route>
            {/* <Route path="/foods/:FoodDetails">
              <FoodDetails></FoodDetails>
            </Route> */}
            <Route path="/foods/" >
                <Foods></Foods>
            </Route>
          </Switch>
        </Router>
     
    </div>
  );
}

export default App;
