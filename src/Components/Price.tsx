import React from 'react';

interface PriceProps {
  price: number;
  oldPrice: number;
}


const Price = ({ price, oldPrice }: PriceProps) => {
  function getOldPrice() {
    return oldPrice.toFixed(2);
  }

  function getNewPrice() {
    return price.toFixed(2);
  }
  return (
    <p className='card-price'>{getNewPrice()}€ <span className='card-old-price'>{getOldPrice()}€</span></p>
  );
};

export default Price;