import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Tutorial from '../Components/Tutorial';


const Cashback: React.FC = () => {
  return (
    <div>
      <Header/>
      <Tutorial stage="a"/>
      <Footer/>
    </div>
  );
};

export default Cashback;