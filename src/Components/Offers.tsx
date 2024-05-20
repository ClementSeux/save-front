import HCard from './HCard';

const Offers = () => {
  return (
    <article id="offers">

      <h2 className='sous-titre'>Nos offres</h2>

      <HCard cartId={1} />
      <HCard cartId={1} />
      <HCard cartId={1} />

      {/* <HCard 
        title='Panier propreté' 
        price={43.98}
        oldPrice={51.70}
        description="Contiens : Dentifrice, Gel douche, Serviettes, et bien plus..."
        details="Ce panier est l'alliance parfaite entre qualité et petits prix !
        En tout, de nombreux articles et offres dont on ne peut pas se passer !"
        articles={['Kit Beauté: 1 Mascara, 1 rouge à lèvres', 'Lingettes démaquillantes', 'Cotons', 'Soin visage, etc..']}
      />

      <HCard 
        title='Panier gourmand' 
        price={30.27}
        oldPrice={51.20}
        description="Contiens : Dentifrice, Mascara, Gel douche, et bien plus..."
        details="Ce panier est l'alliance parfaite entre qualité et petits prix !
        En tout, de nombreux articles et offres dont on ne peut pas se passer !"
        articles={['Kit Beauté: 1 Mascara, 1 rouge à lèvres', 'Lingettes démaquillantes', 'Cotons', 'Soin visage, etc..']}
      />
      <HCard 
        title='Panier beauté' 
        price={37.72}
        oldPrice={64.98}
        description="Contiens : Chocolat, Petits gateaux, et plein d'autres douceurs..."
        details="Ce panier est l'alliance parfaite entre qualité et petits prix !
        En tout, de nombreux articles et offres dont on ne peut pas se passer !"
        articles={['Kit Beauté: 1 Mascara, 1 rouge à lèvres', 'Lingettes démaquillantes', 'Cotons', 'Soin visage, etc..']}
      /> */}
    </article>
  );
};

export default Offers;