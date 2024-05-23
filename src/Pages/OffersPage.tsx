import React from 'react';
import Header from '../Components/Header';
import Offers from '../Components/Offers';
import Footer from '../Components/Footer';

const Home: React.FC = () => {
  return (
    <div>
      <Header/>
      <Offers cartList={[]} />
      <Footer/>
    </div>
  );
};

export default Home;