import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// styles
import './App.css';

// pages
import Home from './pages/home';
import Event from './pages/event';
import Register from './pages/register';
import Login from './pages/login';
import Bookmarks from './pages/allBookmarks';
import RegisteredEvents from './pages/allRegistrations';
import Dashboard from './pages/organiser/dashboard';
import UpdateEvent from './pages/organiser/updateEvent';
import NotFound from './pages/notFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User */}
        <Route index path='/' element={<Home />} />
        <Route path="/event/:id" element={<Event />} />
        <Route path="/user-register" element={<Register user={true} />} />
        <Route path="/user-login" element={<Login user={true} />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/registered-events' element={<RegisteredEvents />} />
        {/* Organiser */}
        <Route path="/organiser-register" element={<Register user={false} />} />
        <Route path="/organiser-login" element={<Login user={false} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update-event/:id" element={<UpdateEvent />} />
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
