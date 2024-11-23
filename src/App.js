// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../src/pages/Login';
import Warehouse from '../src/pages/Warehouse';
import Buyer from '../src/pages/Buyer';
import AuthWarehouse from './pages/AuthWarehouse';
import AuthBuyer from './pages/AuthBuyer';
import Add from './pages/AddProduct';
import Update from './pages/UpdateProduct';
import Fetch from './pages/FetchProduct';
import MainActions from './pages/MainActions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<AuthWarehouse />} />
        <Route path="/authb" element={<AuthBuyer />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/add" element={<Add />} />
        <Route path="/fetch" element={<Fetch />} />
        <Route path="/update" element={<Update />} />
        <Route path="/mainaction" element={<MainActions />} />
      </Routes>
    </Router>
  );
}

export default App;
