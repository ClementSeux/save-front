import React from 'react';
import VCard from './VCard';

const Favoris = () => {
  return (
    <article id="favoris">
      <h2>Nos favoris</h2>
      <div id="favs-row">
        <VCard
          image='fav1.jfif' 
          title='Panier découverte' 
          price={129.99}
          oldPrice={159.99}
          description="Contiens : Un lot de fruit et légumes (change selon l’enseigne), un produit laitier et bien plus..."
        />
        <VCard 
          image='fav2.jfif' 
          title='Panier ménage' 
          price={129.99}
          oldPrice={159.99}
          description="Contiens : Assouplissant, Essuie tout, Lessive, et bien plus..."
        />
        <VCard 
          image='fav3.jfif' 
          title='Panier bébé' 
          price={129.99}
          oldPrice={159.99}
          description="Contiens : Couches, Lingettes, Petits pots et bien plus..."
        />

      </div>
    </article>
  );
};

export default Favoris;