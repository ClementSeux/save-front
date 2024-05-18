// simple app.tsx file for react app with a rooter

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthContextProvider from './Providers/AuthContextProvider.tsx';

import Home from './Pages/Home.tsx';

import Navbar from './Components/Navbar.tsx';

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;