const Footer = () => {
  return (
    <footer id="footer" >
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 first-col">
            <img className="logo" src="/images/light_logo.png" alt="save logo" />
            <p>Restez connecté grâce à notre newsletter</p>
            <form>
              <input type="email" name="email" id="email-input" placeholder='Entrez votre email'/>
              <button>S'inscrire</button>
            </form>
          </div>
          <div className="col-12 col-lg second-col">
            <h5>Visitez le site</h5>
            <ul>
              <li><a href="/">Accueil</a></li>
              <li><a href="/">Nos paniers</a></li>
              <li><a href="/">Nos partenaires</a></li>
            </ul>
          </div>
          <div className="col-12 col-lg third-col">
            <h5>Suivez nous</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-facebook" viewBox="0 0 35 35">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-tiktok" viewBox="0 0 35 35">
              <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 35 35">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;