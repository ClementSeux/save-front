import Price from "./Price";
import VCard from "./VCard";

const SubscribePlan = () => {
 

  return (
    <main id="subscribe">
      <div className='bandeau dark'>
        <h1 className='sous-titre'>S'abonner</h1>
        <p>Avec notre système d'abonnement, vous avez accès à des tonnes d'offres exclusives chaque mois, directement dans votre boîte de réception. 
  Dites adieu aux coupons oubliés et bonjour à des économies régulières sur vos marques préférées.</p>
      </div>
      <div className='container'>
        <div className="row">

          <div className="col-12 col-md-6">
            <div className='card plan-card'>
              <h3>L'offre <span className="accent">explorateur</span></h3>
              <Price price={0} oldPrice={4.99} />
              <button className='standard-button dark'>Découvrir l'offre &#8594;</button>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className='card plan-card'>
              <h3>L'offre <span className="accent">expert</span></h3>
              <Price price={9.99} oldPrice={null} />
              <button className='standard-button dark'>Découvrir l'offre &#8594;</button>
            </div>
          </div>

        </div>
      </div>

      <div className="offer-detail">
        <h2>L'offre explorateur</h2>
        <p>Idéale pour ceux qui veulent tester les eaux, cette option vous offre un avant-goût de nos offres exclusives. 
Recevez des réductions attrayantes sur une sélection de produits et commencez votre voyage vers des économies intelligentes et durables !</p>
        <h4>Quelques exemples</h4>
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-4">
              <VCard
              cartId={1}
            />
            </div>
            <div className="col-12 col-xl-4">
              <VCard
              cartId={1}
            />
            </div>
            <div className="col-12 col-xl-4">
              <VCard
              cartId={1}
            />
            </div>         
          </div>
        </div>
      </div>

    </main>
  );
};

export default SubscribePlan;