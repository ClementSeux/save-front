import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import RegisterForm from '../Components/RegisterForm';

const Register: React.FC = () => {
  return (
    <div>
      <Header/>
      <RegisterForm />
      <Footer/>    
    </div>
  );
};

export default Register