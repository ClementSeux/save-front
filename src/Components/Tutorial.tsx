import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Providers/AuthContextProvider';
import { useUserData } from '../Providers/UserDataProvider';
import { Cart, useCart } from '../Hooks/useCart';
import { Step } from '../types/types';

const Tutorial = () => {
  const { id } = useParams();
  if (!id) {
    return <h1>404 Not Found</h1>;
  }
  
  const { token } = useAuth();
  const { userData, setUserData } = useUserData();
  const { fetchCart } = useCart(id.toString());
  const [cart, setCart] = useState<Cart>(
    {
      id: 0,
      cName: "",
      description: "",
      details: "",
      availableFrom: "",
      availableTo: "",
      steps: [
        {
          id: 0,
          title: "",
          content: "",
          link: "",
          type: "",
          price: 0,
          oldPrice: 0,
          item: {
            id: 0,
            iName: ""
          }
        }
      ]
     }
  );

  function isStepExcluded(stepId: number) {
    if (!userData) {
      return false;
    }
    return userData.exclusions.some((exclusion) => exclusion.step.id === stepId);
  }

  useEffect(() => {
    fetchCart().then((cart) => {
      if (!cart) {
        return;
      }
      setCart(cart);
    });
  }
  , []);


  return (
    <div id="tutorial">
    <div className='bandeau'>
      <h1>{cart.cName}</h1>
      <p>Tutoriel couponing</p>
    </div>

    {cart.steps.map((step: Step) => {
      if(isStepExcluded(step.id)){
        return <div className='excluded' key={step.id}>
          <p>Vous avez déjà exclu cette étape</p>
        </div>
      } else {
        return (
          <div className='step' key={step.id}>
            <h2>{step.title}</h2>
            <p className='card-price'>{ step.price }€ <span className='card-old-price'>{ step.oldPrice }€</span></p>
            <p>{step.content}</p> 
            <a href={step.link}>Lien vers le site</a>*
            <iframe
              src={`https://www.save.back.clementseux.me:3004?link=${step.link}`}
              width="100%"
              height="600"
              title="Shopmium"
            ></iframe>
          </div>
        );
      }
    }
  )
}
</div>
  );
}

export default Tutorial;