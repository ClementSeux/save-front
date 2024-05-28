import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SubmitFormStep from '../Components/SubmitFormStep';

const Home: React.FC = () => {
  return (
    <div>
      <Header/>
      <SubmitFormStep />
      <Footer/>
    </div>
  );
};

export default Home;