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
import Cashback from './Pages/Cashback.tsx';
import SubmitCart from './Pages/SubmitCart.tsx';
import SubmitStep from './Pages/SubmitStep.tsx';
import Subscribe from './Pages/Subscribe.tsx';
import Register from './Pages/Register.tsx';
import Page404 from './Pages/Page404.tsx';


const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <UserDataProvider>
        <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<Home />} />
              <Route path="/offers" element={<OffersPage />} />
              <Route path="/subscribe" element={<Subscribe />} />

              
              <Route path="/details/:id" element={<Details />} />
              <Route path="/coupons/:id" element={<Coupons />} />
              <Route path="/cashback/:id" element={<Cashback />} />

              <Route path="/submit" element={<SubmitCart />} />
              <Route path="/submit-step/:id" element={<SubmitStep />} />

              <Route path="*" element={<Page404 />} />
            </Routes>
        </Router>
      </UserDataProvider>
    </AuthContextProvider>
  );
};

export default App;