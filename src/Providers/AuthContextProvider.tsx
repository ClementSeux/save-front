import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthContextValue {
  login: string;
  setLogin: (login: string) => void;
  password: string;
  setPassword: (password: string) => void;
  token: string;
  getToken: () => Promise<boolean>;
  logout: () => void;
}

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [login, setLogin] = useState(() => localStorage.getItem('login') || '');
  const [password, setPassword] = useState(''); 
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  // TDOD: implement token expiration
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

    
    if (!login || !password) {
      console.error('Login and password are required');
      !login && console.error('login', login); 
      !password && console.error('password', password);
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

  const logout = () => {
    setLogin('');
    setPassword('');
    setToken('');
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
    <AuthContext.Provider value={{login, setLogin, password, setPassword, token, getToken , logout}}>
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