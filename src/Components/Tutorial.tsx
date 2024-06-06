import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserData } from '../Providers/UserDataProvider';
import { Cart, useCart } from '../Hooks/useCart';
import { Step } from '../types/types';
import Price from './Price';

interface TutorialProps {
  stage: "a" | "b";
}

const Tutorial = ({ stage }: TutorialProps) => {
  const { id } = useParams();
  if (!id) {
    return <h1>404 Not Found</h1>;
  }
  
  const { userData } = useUserData();
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
      {stage === 'a' ? <p>Récupère ton cashback !</p> : <p>Tutoriel couponing</p>}
    </div>

    {cart.steps.map((step: Step) => {
      if (stage ===  step.type ) {
        if(isStepExcluded(step.id)){
          return <div className='excluded' key={step.id}>
            <p>Vous avez déjà exclu cette étape</p>
          </div>
        } else {
          return (
            <div>
              <div className='step' key={step.id}>
                <h2>{step.title}</h2>
                <Price price={step.price} oldPrice={step.oldPrice} />
                <p>{step.content}</p> 
                <a 
                  href={step.link} 
                  target="_blank"
                  style={
                    {
                      fontSize: "1.1rem",
                      marginBottom: "2rem",
                    }
                  }
                >Lien vers le site</a>
                <iframe
                  src={`https://www.save.back.clementseux.me:3004?link=${step.link}`}
                  width="100%"
                  height="600"
                  title="Shopmium"
                  sandbox="allow-same-origin  allow-scripts allow-popups allow-forms allow-top-navigation"
                ></iframe>
              </div>
            </div>
          );
        }
      }
    }
  )
}
</div>
  );
}

export default Tutorial;