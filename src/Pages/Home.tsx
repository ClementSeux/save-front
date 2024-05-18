// simple Home.tsx react page

import React , { useEffect } from 'react';
import { useAuth } from '../Providers/AuthContextProvider';

const Home: React.FC = () => {
  const {  token, login, getToken, setLogin } = useAuth();


  const getAuth = async () => {
    const loginInput = prompt('Login');
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
      <div className="badge"
      style={
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100px',
          height: '100px',
          backgroundColor: 'blue',
          color: 'white',
          borderRadius: '50%',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }
      }>
        <h1>{login}</h1>
      </div>


      <h1>Home</h1>
      <p>Home page content</p>
      <p>Token: {token}</p>
     
    </div>
  );
};

export default Home;