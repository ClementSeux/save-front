import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Providers/AuthContextProvider';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordInput, setPasswordClr] = useState('');
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [hashing, setHashing] = useState<boolean>(false);


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordClr(event.target.value);
  };

  const handleAcceptConditionsChange = () => {
    // toggle the state
    setAcceptConditions((state) => !state);
  };


  async function handleSubmit() {
    if (!acceptConditions) {
      alert("Vous devez accepter les conditions générales et la politique de confidentialité");
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": name,
      "email": email,
      "password": passwordInput
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect
    };

    fetch("https://www.save.back.clementseux.me:8080/user", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => {
        // display a modal then redirect to login
        document.getElementById("register-modal")!.style.display = "block";
      })
  }



  return (
    <main id="register">

      {/* modal register ok */}
      <div className="modal" id="register-modal">
        <div className="modal-content">
          <p>
            Votre compte a bien été créé. Vous allez être redirigé vers la page de connexion.
          </p>
          <button
            className="standard-button"
            onClick={() => {
              document.getElementById("register-modal")!.style.display = "none";
              navigate("/login");
            }}
          >
            OK
          </button>
        </div>
      </div>
      
      
      <div className="bandeau">
      <h1>S'inscrire</h1>
      </div>
      
      <div className="container">
        <a href="/login"
          className="standard-button"
        >&larr; Retour</a>

        <div className="row">
          <form id="register-zone" className="square-zone" onSubmit={handleSubmit}>
           
            <div className="form-zone">
              <label htmlFor="name">Nom</label>
              <input type="text" id="name" name="name" placeholder="" required onChange={handleNameChange} />
            </div>
           
           
           
            <div className="form-zone">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="" required onChange={handleEmailChange} />
            </div>

            <div className="form-zone larger">
              <label htmlFor="password">Mot de passe</label>
              <input type="password" id="password" name="password" placeholder="Mot de passe" required onChange={handlePasswordChange} />
            </div>

            {/* checkbox require "J'accepte les conditions générales et la politique de confidentialité" */}

            <div className="form-zone">
              <input type="checkbox" id="terms" name="terms" required onChange={handleAcceptConditionsChange}  />
              <label htmlFor="terms">J'accepte les conditions générales et la politique de confidentialité</label>
            </div>


            <button className="standard-button"
              type="submit"
             >Enregistrer &#8594;</button>
          </form>

        </div>



      </div>
      
    </main>
  );
};

export default RegisterForm;