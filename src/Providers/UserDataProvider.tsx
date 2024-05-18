// context provider for user data

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContextProvider';

interface UserDataContextProviderProps {
  children: ReactNode;
}

const UserDataContext = createContext<UserDataContextValue | undefined>(undefined);

interface UserDataContextValue {
  userData: UserData | undefined;
  getUserData: () => Promise<boolean>;
}

interface UserData {
  id: number;
  uName: string;
  email: string;
  role: string;
}

const UserDataProvider: React.FC<UserDataContextProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | undefined>(undefined);

  const getUserData = async () : Promise<boolean> => {
    const token = useAuth().token;
    if (!token) {
      console.error('No token found');
      return false;
    }

    try {
      const response = await fetch('https://www.save.back.clementseux.me:8080/user/id', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      });

      const data = await response.json();
      setUserData(data);
      
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, getUserData }}>
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


