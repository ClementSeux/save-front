import React , { useEffect, useState } from 'react';
import { Cart, useCart } from '../Hooks/useCart';
import { useParams } from 'react-router-dom';
import ItemCard from './ItemCard';


const Liste: React.FC = () => {
  const { id } = useParams();
  if (!id) {
    return <h1>404 Not Found</h1>;
  }
  
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
        {cart.steps.map((step) => {
          if (step.price !== 0) {
            return <ItemCard step={step} key={step.id} />;
          }
          return null;
        })}
      </div>
      {cart.cName ? null : <h1>Loading...</h1>}
    </div>
  );
};

export default Liste;
