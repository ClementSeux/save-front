import  { useState, useEffect } from 'react';
import { useUserData } from '../Providers/UserDataProvider';
import { Step } from '../types/types';
import Price from './Price';

// props:
interface ItemCardProps {
  step: Step;
}

const ItemCard = ({ step }: ItemCardProps) => {
  const {userData, setUserData} = useUserData();
  const [excluded, setExcluded] = useState(false);

  useEffect(() => {
    if (userData) {
      setExcluded(userData?.exclusions.some((exclusion) => exclusion.step.id === step.id));
    }
  }, [userData, step.id]);

  const handleExclusion = async () => {
    if (!userData) {
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

    const raw = JSON.stringify({
      "user": userData.id,
      "step": step.id
    });

    const requestOptions = {
      method: excluded ? "DELETE" : "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect
    };

    try {
      await fetch(`https://www.save.back.clementseux.me:8080/exclusions${excluded? `/${userData.id}/${step.id}` : ""}`, requestOptions).then((response) => {
      if (response ){
        if (excluded) {
        setUserData({...userData, exclusions: userData.exclusions.filter((exclusion) => exclusion.step.id !== step.id)});
        }
        else {
          setUserData({...userData, exclusions: [...userData.exclusions, {step: step}]});
        }
      }
    }
    )
    }
    catch (error) {
      console.error("error", error);
    }
  };


  return (
    <div key={step.id} className='item-card'>
            <div>
              <input type="checkbox" checked={!excluded}
              onChange={() => {handleExclusion()}}
              />
            </div>
            <div>
              <img src="/images/items/snickers.jpg" alt="pringles" />
            </div>
            <div className='item-body'>
              <p className="item-name">{step.item.iName}</p>
              <Price price={step.price} oldPrice={step.oldPrice} />
            </div>
          </div>
  );
};

export default ItemCard;