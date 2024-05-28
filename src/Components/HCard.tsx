import React , { useEffect, useState } from 'react';
import { Cart , useCart } from '../Hooks/useCart';

const HCard = ({
  cartId} : {cartId: number}) => {
  
  const {fetchCart} = useCart(cartId.toString())
  const [cart, setCart] = useState<Cart>({id: 0, cName: "", description: "", details: "", availableFrom: "", availableTo: "", steps: [{id: 0, title: "", content: "", link: "", type: "", price: 0, oldPrice: 0, item: {id: 0, iName: ""}}]})

  
  async function initCart() {
    const result = await fetchCart()
    if (result && result.id !== 0) {
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

    const [collapsed, setCollapsed] = React.useState(true);

    const toggleCollapse = () => {
      setCollapsed(!collapsed);
    }

    const collapseClass = collapsed ? 'collapse' : 'collapse show';


  return (
    <div className='hcard card' >
      <div className='hcard-body'>
        <div className='hcard-body-left'>
          <h5 className='card-title'>{cart.cName}</h5>
          <p className='card-price'>{getNewPrice()}€ <span className='card-old-price'>{getOldPrice()}€</span></p>
          <p className='card-text'>{cart.description}</p>

        </div>
          
        <div className="card-buttons">
          <button className="toggle-button" onClick={toggleCollapse} type="button">
            {collapsed ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
              </svg>
            : 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
              </svg>
              }
          </button>
          <a className="details" href={"/details/"+cart.id}>
            Liste
          </a>
          <a className="details" href={"/coupons/"+cart.id}>
            Coupons
          </a>
          <a className="details" href={"/cashback/"+cart.id}>
            Cashback
          </a>

        </div>
      </div>

      <div className={collapseClass} >
        <hr />
        <div className='card card-body'>
          <div className='col1'>
            <p className='card-text'>{cart.details}</p>
          </div>
          <div className='col2'>
            <div>
              <h6>Articles disponibles</h6>
            </div>
            <div>
              <ul>
                {cart.steps.map((step, index) => (
                  <li key={index}>{step.item.iName}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HCard;