import React, { useEffect, useState } from 'react';
import { useAuth } from '../Providers/AuthContextProvider';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const SubmitFormStep = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState<"a" | "b">("b");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);

  const [itemsList, setItemsList] = useState<string[]>([]);
  const [itemsRawList, setItemsRawList] = useState<string[]>([]);
  
  async function fetchItems() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    return fetch("https://www.save.back.clementseux.me:8080/items", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      setItemsRawList(result);
      const items = result.map((item: any) => item.iName);
      setItemsList(items);
    }
    )
    .catch((error) => console.error(error));
  }

  function getItemId(itemName: string) {
    let itemId = 0;
    itemsRawList.forEach((item: any) => {
      if (item.iName === itemName) {
        itemId = item.id;
      }
    });
    return itemId;
  }


  async function handleSubmit(e: React.FormEvent<HTMLFormElement> | null, redirectToCart: boolean = false) {
    if (e) {
      e.preventDefault();
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
      title: title,
      cart: id ,
      content: content,
      link: link,
      type: type,
      item: getItemId(item),
      price: price,
      oldPrice: oldPrice,
    });

    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };
    
    return fetch("https://www.save.back.clementseux.me:8080/steps", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (redirectToCart) {
        navigate(`/details/${id}`);
      }
      setContent("");
      setLink("");
      setTitle("");
      setItem("");
      setPrice(0);
      setOldPrice(0);
    }
    )
  }
  
  function handleOldPriceChange(value: any) {
    const val = value;
    try {
      const value = Number(val)
      setOldPrice(value);
    } catch (error) {
      return
    }
  }

  function handlePriceChange(value: any) {
    const val = value;
    try {
      const value = Number(val)
      setPrice(value);
    } catch (error) {
      return
    }
  }

  useEffect(() => {
    console.log("fetching items");
    fetchItems();
  }
  , []);


  return (
    <div id='submit-form'>
      <h1>Nouvelle étape</h1>

      <form action="" onSubmit={(e)=> handleSubmit(e, true)}>
        <label htmlFor="title">Titre:</label>
        <input type="title" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <br/>

        <label>Type:</label>
        <input type="radio" id="b" name="type" value="b" checked={type === "b"} onChange={(e) => setType("b")}/>
        <label htmlFor="b">Couponing</label>
        <input type="radio" id="a" name="type" value="a" checked={type === "a"} onChange={(e) => setType("a")}/>
        <label htmlFor="a">Cashback</label>
        <br/>

        <label htmlFor="content">Description:</label>
        <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)}/>
        <br/>

        <label htmlFor="link">Lien:</label>
        <textarea id="link" name="link" value={link} onChange={(e) => setLink(e.target.value)}/>
        <br/>

        <label htmlFor="item">Produit:</label>
        <select name="item" id="item" value={item} onChange={(e) => setItem(e.target.value)}>
          {itemsList.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <br/>

        <label htmlFor="oldPrice">Ancien prix:</label>
        <input type="number" id="oldPrice" name="oldPrice" value={oldPrice} onChange={(e) => handleOldPriceChange(e.target.value)} step="any"/>

        <br/>
       
        <label htmlFor="price">Nouveau prix:</label>
        <input type="number" id="price" name="price" value={price} onChange={(e) => handlePriceChange(e.target.value)} step="any"/>
        <br/>

        <input type="submit" value="Soumettre une nouvelle étape" className='standard-button'/>

        <button  className='standard-button'
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(null, false);
          }}
        
        >Terminer le panier</button>
      </form>
      
    </div>
  );
};

export default SubmitFormStep;