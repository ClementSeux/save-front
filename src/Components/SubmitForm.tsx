import React, { useEffect, useState } from 'react';
import { useAuth } from '../Providers/AuthContextProvider';

const SubmitForm = () => {
  const { token } = useAuth();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [reseller, setReseller] = useState<string>('');
  const [availableFrom, setAvailableFrom] = useState<string>('');
  const [availableTo, setAvailableTo] = useState<string>('');

  const [resellersRawList, setResellersRawList] = useState<string[]>([]);
  const [resellersList, setResellersList] = useState<string[]>([]);

  function fetchResellers() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect,
    };

    return fetch("https://www.save.back.clementseux.me:8080/resellers", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      setResellersRawList(result);
      const resellers = result.map((reseller: any) => reseller.rName);
      setResellersList(resellers);
    }
    )
    .catch((error) => console.error(error));
  }

  function getResellerId(resellerName: string) {
    let resellerId = 0;
    resellersRawList.forEach((reseller: any) => {
      if (reseller.rName === resellerName) {
        resellerId = reseller.id;
      }
    });
    return resellerId;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(name, description, details, reseller, availableFrom, availableTo);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
      "expertId": 0,
      "cName": name,
      "description": description,
      "details": details,
      "resellerId": getResellerId(reseller),
      "availableFrom": availableFrom,
      "availableTo": availableTo,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };

    
    return fetch("https://www.save.back.clementseux.me:8080/carts", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  }
  
  useEffect(() => {
    fetchResellers();
  }
  , []);

  return (
    <div>
      <h1>Submit Form</h1>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom du panier:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <br/>

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <br/>

        <label htmlFor="details">Details:</label>
        <textarea id="details" name="details" value={details} onChange={(e) => setDetails(e.target.value)}/>
        <br/>

        <label htmlFor="reseller">Revendeur:</label>
        <select name="reseller" id="reseller" value={reseller} onChange={(e) => setReseller(e.target.value)}>
          {resellersList.map((reseller) => <option key={reseller} value={reseller}>{reseller}</option>)}
        </select>
        <br/>

        <label htmlFor="availableFrom">Le panier est valable à partir du:</label>
        <input type="date" id="availableFrom" name="availableFrom" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)}/>
        <br/>

        <label htmlFor="availableTo">Le panier est valable jusqu'au:</label>
        <input type="date" id="availableTo" name="availableTo" value={availableTo} onChange={(e) => setAvailableTo(e.target.value)}/>
        <br/>
       
        <input type="submit" value="Submit Form Data"/> 
      </form>
      
    </div>
  );
};

export default SubmitForm;