import React from 'react';
import Banner from '../Banner/Banner';
import ChooseUs from '../ChooseUs/ChooseUs';
import Footer from '../Footer/Footer';
import FooterTop from '../FooterTop/FooterTop';
import Food from '../Food/Food';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <Food></Food>
            <ChooseUs></ChooseUs>
            <FooterTop></FooterTop>
            <Footer></Footer>
        </div>
    );
};

export default HomePage;