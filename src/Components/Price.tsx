interface PriceProps {
  price: number;
  oldPrice: number|null;
}


const Price = ({ price, oldPrice }: PriceProps) => {
  function getOldPrice() {
    if (oldPrice === null) return "";
    return oldPrice.toFixed(2);
  }

  function getNewPrice() {
    return price.toFixed(2);
  }
  return (
    <p className='card-price'>{getNewPrice()}€ <span className='card-old-price'>{oldPrice? getOldPrice() + "€": ""}</span></p>
  );
};

export default Price;