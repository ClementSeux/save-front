import React , { useEffect, useState } from 'react';
import { Cart, useCart } from '../Hooks/useCart';
import { useUserData } from '../Providers/UserDataProvider';
import { useParams } from 'react-router-dom';
import { useAuth } from '../Providers/AuthContextProvider';
import { Exclusion } from '../types/types';
import ItemCard from './ItemCard';


const Liste: React.FC = () => {
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

  async function postExclusion(stepId: number) : Promise<boolean> {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer" + token);

    const raw = JSON.stringify({
      "user": userData?.id,
      "step": stepId
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect
    };

    return fetch("https://www.save.back.clementseux.me:8080/exclusions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        return true;
      })
      .catch((error) => {
        console.error("error", error);
        return false;
      }
    );
  }

  async function deleteExclusion(stepId: number) : Promise<boolean> {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer" + token);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect
    };

    return fetch(`https://www.save.back.clementseux.me:8080/exclusions/${userData?.id}/${stepId}`, requestOptions)
      .then((response) => {
        if(response.ok) {
          return true;
        } else {
          return false;
        }
      }
    )
  }

  async function handleExclusion(stepId: number, state: boolean) {
    if (userData) {
      if (state) {
        const result = await deleteExclusion(stepId);
        if (result) {
          userData.exclusions = userData.exclusions.filter((exclusion) => exclusion.step.id !== stepId);
        }
      } else {
        const result = await postExclusion(stepId);
        if (result) {
          const excludedStep = cart.steps.find((step) => step.id === stepId);
          if (!excludedStep || typeof excludedStep.id === 'undefined') {
            return;
          }
          const newExclusion : Exclusion = {
            step: {
              id: stepId,
              title: "",
              content: "",
              link: "",
              type: "",
              price: 0,
              oldPrice: 0,
              item: {
                id: 0,
                iName: ""
              },
            
            ... cart.steps.find((step) => step.id === stepId)

            }
          }
          console.log(newExclusion);
          setUserData({
            ...userData,
            exclusions: [...userData.exclusions, newExclusion]
          });
        }
      }
    }
    console.log(userData);
  }


  useEffect(() => {
    fetchCart().then((cart) => {
      if (cart){
      setCart(cart);}
    });
  }, []);

  return (
    <div id='liste'>
      {cart.cName ? 
      <div className='bandeau'>
        <h1>{cart.cName}</h1>
        <p>Maintenant que tu as sélectionné ton panier, il est temps de récupérer tes coupons !
          Pour cela ? Décoche dans la liste les articles qui ne t’intéressent pas avant de continuer !
        </p>
        <p>
          Tout ce qui se trouve ici te plait ?
        </p>
        <a href={`/coupons/${id}`}
        className='standard-button'>Je passe aux coupons &#8594;</a>
                </div> : null}
      <div className='item-list'>
        {cart.steps.map((step) => (
          <ItemCard step={step} key={step.id} />
        ))}
      </div>
      {cart.cName ? null : <h1>Loading...</h1>}
      <p>Details for cart id: {id}</p>
    </div>
  );
};

export default Liste;
