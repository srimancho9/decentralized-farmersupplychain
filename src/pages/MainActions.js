// src/pages/MainActionsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function MainActionsPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h2>Main Actions</h2>
      <button onClick={() => navigate('/add')}>Add Farming Batch</button> {/* New button to add product */}
      <button onClick={() => navigate('/fetch')}>Fetch Batch Details</button>
      <button onClick={() => navigate('/update')}>Update Batch in supply Chain</button>
    </div>
  );
}

export default MainActionsPage;
