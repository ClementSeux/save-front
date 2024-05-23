import { useAuth } from "../Providers/AuthContextProvider"

export type Cart = {
  id: number,
  cName: string,
  description: string,
  details: string,
  availableFrom: string,
  availableTo: string,
  steps: [
    {
      id: number,
      title: string,
      content: string,
      link: string,
      type: string,
      price: number,
      oldPrice: number,
      item: {
        id: number,
        iName: string
      }
    }
  ]
}

export const useCart = (cartId: string) => {
  const { token } = useAuth()
 
  async function fetchCart() {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow" as RequestRedirect
    };

    return  fetch("https://www.save.back.clementseux.me:8080/carts/"+cartId, requestOptions)
      .then(async (response) => 
        
        await response.json() as Promise<Cart>
      )
      .then((result) =>{
        console.log(result)
        return result}
      )
      .catch((error) => console.error(error));

  }
  return { fetchCart }
}