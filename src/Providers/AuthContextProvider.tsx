import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthContextValue {
  token: string;
  login: string;
  getToken: () => Promise<boolean>;
  setLogin: (login: string) => void;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [login, setLogin] = useState(() => localStorage.getItem('login') || '');
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  // const [expiration, setExpiration] = useState(() => localStorage.getItem('expiration') || '');

  // const checkTokenExpiration = () => {
  //   if (expiration) {
  //     const expirationDate = new Date(expiration);
  //     if (expirationDate > new Date()) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  const getToken = async () : Promise<boolean> => {
    if (token) {
      return true;
    }

    const password = prompt('Password');
    if (!login || !password) {
      console.error('Login and password are required');
      !login && console.error('login', login); 
      !password && console.error('password', password);
      return false;
    }

    try {
      const response = await fetch('https://www.save.back.clementseux.me:8080/auth/token', {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa(`${login}:${password}`)}`,
          'Access-Control-Allow-Origin': '*',
        },
      });

      const data = await response.json();
      setToken(data.access_token);
      
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    console.log('storing login', login);
    localStorage.setItem('login', login);
  }, [login]);

  useEffect(() => {
    console.log('storing token', token);
    localStorage.setItem('token', token);
  }, [token]);

  // useEffect(() => {
  //   localStorage.setItem('expiration', expiration);
  // }, [expiration]);

  return (
    <AuthContext.Provider value={{ token, login, getToken, setLogin }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export default AuthContextProvider;