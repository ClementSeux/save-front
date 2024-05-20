import VCard from './VCard';

const Favoris = () => {
  return (
    <article id="favoris">
      <h2 className='sous-titre' >Nos favoris</h2>
      <div id="favs-row">
        <VCard
          cartId={1}
        />
        <VCard
          cartId={1}
        />
        <VCard
          cartId={1}
        />

      </div>
    </article>
  );
};

export default Favoris;