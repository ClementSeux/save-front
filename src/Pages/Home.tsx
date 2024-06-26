import React from 'react';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import Favoris from '../Components/Favoris';
import Offers from '../Components/Offers';
import Partners from '../Components/Partners';
import Footer from '../Components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <Header/>
      <Banner/>
      <Favoris/>
      <Offers cartList={[1, 1, 1]} />
      <Partners/>
      <Footer/>
    </div>
  );
};

export default Home;