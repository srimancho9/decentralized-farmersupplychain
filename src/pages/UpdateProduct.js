// src/pages/UpdateSupplyChainPage.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../App.css';

function UpdateSupplyChainPage() {
  const [batchId, setBatchId] = useState('');
  const [batchState, setBatchState] = useState('sourcing'); // Default state
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const contractAddress = "0xB67E615e07F71c18AC9a431cA2f2A2FFA373d174";
 const abi = [
  {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
  },
  {
      "inputs": [],
      "name": "getOwner",
      "outputs": [
          {
              "internalType": "address",
              "name": "",
              "type": "address"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "address",
              "name": "provider",
              "type": "address"
          }
      ],
      "name": "authorizeProvider",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "batchID",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "batchType",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "description",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
          }
      ],
      "name": "addBatch",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "batchID",
              "type": "uint256"
          }
      ],
      "name": "fetchBatch",
      "outputs": [
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          },
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          },
          {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "",
              "type": "string"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  },
  {
      "inputs": [
          {
              "internalType": "uint256",
              "name": "batchID",
              "type": "uint256"
          },
          {
              "internalType": "string",
              "name": "newStatus",
              "type": "string"
          }
      ],
      "name": "updateBatchStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
      "inputs": [],
      "name": "getAllBatches",
      "outputs": [
          {
              "components": [
                  {
                      "internalType": "uint256",
                      "name": "batchID",
                      "type": "uint256"
                  },
                  {
                      "internalType": "string",
                      "name": "batchType",
                      "type": "string"
                  },
                  {
                      "internalType": "string",
                      "name": "description",
                      "type": "string"
                  },
                  {
                      "internalType": "uint256",
                      "name": "price",
                      "type": "uint256"
                  },
                  {
                      "internalType": "string",
                      "name": "status",
                      "type": "string"
                  }
              ],
              "internalType": "struct SupplyChain.Batch[]",
              "name": "",
              "type": "tuple[]"
          }
      ],
      "stateMutability": "view",
      "type": "function"
  }
];

  useEffect(() => {
    const connectWallet = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setProvider(provider);
        setSigner(signer);

        const accountAddress = await signer.getAddress();
        setAccount(accountAddress);

        const contract = new ethers.Contract(contractAddress, abi, signer);
        setContract(contract);

        alert("Metamask connected");
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    };
    connectWallet();
  }, []);

  const updateSupplyChain = async () => {
    if (!batchId) {
      alert("Please enter a Batch ID");
      return;
    }

    try {
      const batchIDInt = parseInt(batchId); // Convert batchId to integer
      const tx = await contract.updateBatchStatus(batchIDInt, batchState);
      await tx.wait(); // Wait for the transaction to be mined

      alert(`Batch ID: ${batchId} updated to ${batchState}`);
    } catch (error) {
      console.error("Error updating batch status:", error);
      alert("Error updating batch status. Please ensure the Batch ID is correct and that you are authorized.");
    }
  };

  return (
    <div className="page-container">
      <h2>Update Supply Chain</h2>
      <input
        type="text"
        placeholder="Enter Batch ID"
        value={batchId}
        onChange={(e) => setBatchId(e.target.value)}
        className="input-field"
      />
      <select 
        value={batchState} 
        onChange={(e) => setBatchState(e.target.value)} 
        className="select-field"
      >
        <option value="sourcing">Sourcing and Cultivation</option>
        <option value="post_harvest">Post-Harvest Handling</option>
        <option value="storage">Storage</option>
        <option value="packaging">Packaging</option>
        <option value="transportation">Transportation</option>
        <option value="distribution">Retail and Distribution</option>
      </select>
      <button onClick={updateSupplyChain} className="action-button">Update</button>
    </div>
  );
}

export default UpdateSupplyChainPage;
