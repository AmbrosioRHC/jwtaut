import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Signup from '../src/components/Signup';
import Login from '../src/components/Login';
import PrivatePage from './components/PrivatePage'; // Asegúrate de implementar esta ruta protegida
import Home from '../src/pages/Home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<PrivatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
