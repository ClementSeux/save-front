import { useEffect, useState } from 'react';
import HCard from './HCard';
import { useAuth } from '../Providers/AuthContextProvider';

type OffersProps = {
  cartList: Array<number> | undefined;
};

const Offers = ({ cartList }: OffersProps) => {
  const { token } = useAuth();
  const [carts, setCarts] = useState([]);

  function getAllCarts() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };
    
     fetch("https://www.save.back.clementseux.me:8080/carts", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setCarts(JSON.parse(result));
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (cartList && cartList.length !== 0) return;
    getAllCarts();
  }, []);





  return (
    <article id="offers">
      <div className='bandeau'>
      <h1 className='sous-titre'>Nos offres</h1>
      </div>


      {cartList && cartList.length !== 0 ?
      
      cartList.map((cartId, index) => (
        <HCard key={index} cartId={cartId} />
      ))
      :
      carts.map((cart: any, index: number) => (
        <HCard key={index} cartId={cart.id} />
      ))
      }
{/* 
      <HCard cartId={1} />
      <HCard cartId={1} />
      <HCard cartId={1} /> */}

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

      {
        cartList && cartList.length !== 0 &&
        <a className="standard-button" href="/offers">
          <span>
            Découvrir les offres &#8594;
          </span>
        </a>
      }

    </article>
  );
};

export default Offers;