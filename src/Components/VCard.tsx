import React from 'react';

// props de la VCard:
// - image: string
// - nom: string
// - prix
// - description

const VCard = (
  { image, title, price, oldPrice, description }: 
  { image: string, 
    title: string, 
    price: number, 
    oldPrice: number,    
    description: string 
  }
) => {

  return (
    <div className='vcard card' >
      <img className='card-img-top' src={"/images/" + image} alt="panier" />
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-price'>{price}€ <span className='card-old-price'>{oldPrice}€</span></p>
        <p className='card-text'>{description}</p>
        <a href="#" className='btn btn-primary card-button'>Découvrir l'offre &#8594;</a>
      </div>
    </div>
  );
};

export default VCard;