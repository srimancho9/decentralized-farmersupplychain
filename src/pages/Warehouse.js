// src/components/Warehouse.js
import React, { useState } from 'react';
import '../App.css';

const Warehouse = () => {
    const [batchID, setBatchID] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [quantity, setQuantity] = useState('');
    const [status, setStatus] = useState('inventory');

    const createBatch = () => {
        alert(`Batch Created: ID - ${batchID}, Details - ${productDetails}, Quantity - ${quantity}`);
        // Clear form fields
        setBatchID('');
        setProductDetails('');
        setQuantity('');
    };

    const updateBatchStatus = (newStatus) => {
        setStatus(newStatus);
        alert(`Batch ${batchID} status updated to ${newStatus}`);
    };

    return (
        <div className="warehouse-container">
            <h2>Warehouse Dashboard</h2>
            <div>
                <input
                    type="text"
                    placeholder="Batch ID"
                    value={batchID}
                    onChange={(e) => setBatchID(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Product Details"
                    value={productDetails}
                    onChange={(e) => setProductDetails(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={createBatch}>Create Batch</button>
            </div>
            <div>
                <button onClick={() => updateBatchStatus('Warehouse')}>Move to Warehouse</button>
                <button onClick={() => updateBatchStatus('Retail')}>Move to Retail</button>
            </div>
        </div>
    );
};

export default Warehouse;
