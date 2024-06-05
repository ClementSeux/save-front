import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Providers/AuthContextProvider';

const Connexion = () => {
  const navigate = useNavigate();
  const { login, password, setLogin, setPassword, getToken } = useAuth();
  const [email, setEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLogin(email);
    setPassword(inputPassword);
  };

  useEffect(() => {
    if (login && password) {
      getToken();
      // redirect to home page
      navigate('/');


    }
  }, [login, password]);


  return (
    <main id="login">
      <div className="bandeau">
      <h1>Se connecter</h1>
      </div>
      
      <div className="container">
        <div className="row">
          <form id="login-zone" className="square-zone" onSubmit={handleSubmit}>
            <div className="form-zone">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Email" required onChange={handleEmailChange} />
            </div>

            <div className="form-zone larger">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" name="password" placeholder="Mot de passe" required onChange={handlePasswordChange} />
              <a href="">Mot de passe oublié</a>
            </div>
            <button className="standard-button"
              type="submit"
             >Se connecter</button>
          </form>

          <div className="square-zone">
            <h2>Créez votre compte</h2>
            <a href="/register"
              className='standard-button'
            >
              Commencer &#8594;
            </a>
          </div>

        </div>



      </div>
      
    </main>
  );
};

export default Connexion;