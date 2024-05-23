import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Liste from '../Components/Liste';


const Details: React.FC = () => {
  return (
    <div>
      <Header/>
      <Liste />
      <Footer/>
    </div>
  );
};

export default Details;