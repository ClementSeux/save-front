import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContextProvider';
import { UserData } from '../types/types';

interface UserDataContextProviderProps {
  children: ReactNode;
}

const UserDataContext = createContext<UserDataContextValue | undefined>(undefined);

interface UserDataContextValue {
  userData: UserData | undefined;
  setUserData: (userData: UserData) => void;
  
}


const UserDataProvider: React.FC<UserDataContextProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const { token } = useAuth();

  const getUserData = async () : Promise<boolean> => {
    if (!token) {
      console.error('No token found');
      return false;
    }

    try {
      const response = await fetch('https://www.save.back.clementseux.me:8080/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      });

      const data = await response.json();
      setUserData(data);
      console.log(data);      
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    if (token)
    getUserData();
  }, [token]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );

};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within an UserDataProvider');
  }
  return context;
};


export default UserDataProvider;


