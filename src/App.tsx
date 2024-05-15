// simple app.tsx file for react app with a rooter

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './Pages/Home.tsx';

import Navbar from './Components/Navbar.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;