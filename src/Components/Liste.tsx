import React , { useEffect, useState } from 'react';
import { Cart, useCart } from '../Hooks/useCart';
import { useUserData } from '../Providers/UserDataProvider';
import { useParams } from 'react-router-dom';


const Liste: React.FC = () => {
  const { id } = useParams();
  console.log("cartId" , id);
  if (!id) {
    return <h1>404 Not Found</h1>;
  }

  const { fetchCart } = useCart(id.toString());
  const [cart, setCart] = useState<Cart>({
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
  });

  const [myCart, setMyCart] = useState<Cart>({
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
  });

  const { user } = useUserData();

    useEffect(() => {
      fetchCart().then((cart) => {
        if (cart){
        setCart(cart);}
      });
    }, [fetchCart]);

    useEffect(() => {
      if (user && user.cartId) {
        if(user.)
    }, [user, cart]);

    return (
      <div id='liste'>
        {cart.cName ? 
        <div className='bandeau'>
          <h1>{cart.cName}</h1>
        </div> : null}
        <div className='item-list'>
          {cart.steps.map((step) => (
            <div key={step.id} className='item-card'>
              <div>
                <input type="checkbox" />
              </div>
              <div>
                <img src="/images/snickers.jpg" alt="pringles" />
              </div>
              <div className='item-body'>
                <p className="item-name">{step.item.iName}</p>
                <p className='card-price'>{ step.price }€ <span className='card-old-price'>{ step.oldPrice }€</span></p>
              </div>
            </div>
          ))}
        </div>
        {cart.cName ? null : <h1>Loading...</h1>}
        <p>Details for cart id: {id}</p>
      </div>
    );
  };

  export default Liste;
