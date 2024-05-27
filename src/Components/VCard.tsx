import { useEffect, useState } from 'react';
import { useCart } from '../Hooks/useCart';

type Cart = {
  id: number,
  cName: string,
  description: string,
  details: string,
  availableFrom: string,
  availableTo: string,
  steps: [
    {
      id: number,
      title: string,
      content: string,
      link: string,
      type: string,
      price: number,
      oldPrice: number,
      item: {
        id: number,
        iName: string
      }
    }
  ]
}

const VCard = ({
  cartId} : {cartId: number}) => {
  
  const {fetchCart} = useCart(cartId.toString())
  const [cart, setCart] = useState<Cart>({id: 0, cName: "", description: "", details: "", availableFrom: "", availableTo: "", steps: [{id: 0, title: "", content: "", link: "", type: "", price: 0, oldPrice: 0, item: {id: 0, iName: ""}}]})

  
  async function initCart() {
    const result = await fetchCart()
    if( result && result.id !== 0) {
      setCart(result)
    }
  }

  function getOldPrice() {
    return cart.steps.reduce((acc, step) => acc + step.oldPrice, 0)
  }
  
  function getNewPrice() {
    return cart.steps.reduce((acc, step) => acc + step.price, 0)
  }




  useEffect(() => {
    initCart()
  }
  , [])


  return (
    <div className='vcard card' >
      <img className='card-img-top' src={"/images/fav" + cart.id + ".jfif"} alt="panier" />
      <div className='card-body'>
        <h5 className='card-title'>{cart.cName}</h5>
        <p className='card-price'>{getNewPrice()}€ <span className='card-old-price'>{getOldPrice()}€</span></p>
        <p className='card-text'>{cart.description}</p>
        <a  href={"/details/"+cart.id}
        className='btn btn-primary card-button'>Découvrir l'offre &#8594;</a>
      </div>
    </div>
  );
};

export default VCard;