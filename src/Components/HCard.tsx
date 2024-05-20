import React from 'react';

const HCard = (
  { title, price, oldPrice, description, details, articles }: 
  { title: string, 
    price: number, 
    oldPrice: number,    
    description: string,
    details: string,
    articles: string[] 
  }) => {
    const [collapsed, setCollapsed] = React.useState(true);

    const toggleCollapse = () => {
      setCollapsed(!collapsed);
    }

    const collapseClass = collapsed ? 'collapse' : 'collapse show';


  return (
    <div className='hcard card' >
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-price'>{price}€ <span className='card-old-price'>{oldPrice}€</span></p>
        <p className='card-text'>{description}</p>
        
        <div className="card-buttons">
          <button className="toggle-button" onClick={toggleCollapse} type="button">
            {collapsed ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
              </svg>
            : 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
              </svg>
              }

          </button>
          <a className="details" >
            Détails
          </a>
        </div>
        </div>

        <div className={collapseClass} >
          <div className='card card-body'>
            <p className='card-text'>{details}</p>
            <div>
              <h6>Articles disponibles</h6>
              <ul>
                {articles.map((article, index) => (
                  <li key={index}>{article}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    </div>
  );
};

export default HCard;