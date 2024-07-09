import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import './App.css';

// pages
import Home from './pages/home';
import Event from './pages/event';
import Register from './pages/register';
import Login from './pages/login';
import Organiser from './pages/organiser';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path="/dashboard" element={<Organiser />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/user-register" element={<Register user={true} />} />
        <Route path="/user-login" element={<Login user={true} />} />
        <Route path="/organiser-register" element={<Register user={false} />} />
        <Route path="/organiser-login" element={<Login user={false} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
