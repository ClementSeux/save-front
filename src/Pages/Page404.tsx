import Header from '../Components/Header';
import Footer from '../Components/Footer';


const Page404 = () => {
  return (
    <div>
      <Header />
      <div className='bandeau'>
        <h1>
          Oups!
        </h1>
        <p>
          La page que vous cherchez n'existe pas.
        </p>
      </div>
      <Footer />
    </div>
    
  );
};

export default Page404;