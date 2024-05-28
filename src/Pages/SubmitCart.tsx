import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import SubmitForm from '../Components/SubmitForm';

const Home: React.FC = () => {
  return (
    <div>
      <Header/>
      <SubmitForm/>
      <Footer/>
    </div>
  );
};

export default Home;