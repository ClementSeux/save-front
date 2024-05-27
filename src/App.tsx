// simple app.tsx file for react app with a rooter

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import AuthContextProvider from './Providers/AuthContextProvider.tsx';
import UserDataProvider from './Providers/UserDataProvider.tsx';

import Home from './Pages/Home.tsx';
import Login from './Pages/Login.tsx';
import OffersPage from './Pages/OffersPage.tsx';
import Details from './Pages/Details.tsx';
import Coupons from './Pages/Coupons.tsx';


const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <UserDataProvider>
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/offers" element={<OffersPage />} />
              {/* pass :id as props */}
              <Route path="/details/:id" element={<Details />} />
              <Route path="/coupons/:id" element={<Coupons />} />

              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </Router>
      </UserDataProvider>
    </AuthContextProvider>
  );
};

export default App;