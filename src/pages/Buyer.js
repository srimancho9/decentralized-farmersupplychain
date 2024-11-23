// src/components/Buyer.js
import React, { useState } from 'react';
import BatchList from './BatchList';

const Buyer = () => {
    // Placeholder data for testing
    const [batches] = useState([
        { batchID: 1, productDetails: 'Product A', quantity: 100, status: 'Retail' },
        { batchID: 2, productDetails: 'Product B', quantity: 50, status: 'Retail' },
    ]);

    return (
        <div className="buyer-container">
            <h2>Buyer Dashboard</h2>
            <BatchList batches={batches} />
        </div>
    );
};

export default Buyer;
