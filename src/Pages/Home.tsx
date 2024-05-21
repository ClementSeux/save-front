import React , { useEffect } from 'react';
import { useAuth } from '../Providers/AuthContextProvider';
import { useUserData } from '../Providers/UserDataProvider';
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import Favoris from '../Components/Favoris';
import Offers from '../Components/Offers';
import Partners from '../Components/Partners';
import Footer from '../Components/Footer';

const Home: React.FC = () => {
  const {  token, login, getToken, setLogin } = useAuth();
  const {userData} = useUserData();


  const getAuth = async () => {
    const loginInput = 'dada@gmail.com'
    if (loginInput) {
      console.log('loginInput', loginInput);
      setLogin(loginInput);
    }
  }

  
  
  useEffect(() => {
    getAuth();    
  }, []);
  
  useEffect(() => {
    if (login){
    getToken();}
  }, [login]);

  return (
    <div>
      <Header/>
      <Banner/>
      <Favoris/>
      <Offers/>
      <Partners/>
      <Footer/>
     

      <p>Token: {token}</p>
      <p>User data: {userData ? JSON.stringify(userData) : 'loading...'}</p>
     
    </div>
  );
};

export default Home;