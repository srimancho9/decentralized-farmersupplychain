// src/pages/FetchProductDetailsPage.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import '../App.css';


function FetchProductDetailsPage() {
 const [batchId, setBatchId] = useState('');
 const [provider, setProvider] = useState(null);
 const [signer, setSigner] = useState(null);
 const [contract, setContract] = useState(null);
 const [account, setAccount] = useState(null);
 const [batchDetails, setBatchDetails] = useState(null);


 // Contract configuration
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



 // Connect to wallet and set up contract instance
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
     } catch (error) {
       console.error("Error connecting to wallet:", error);
     }
   };
   connectWallet();
 }, []);


 // Fetch batch details from the contract
 const fetchDetails = async () => {
  if (!batchId) {
    alert("Please enter a valid Batch ID");
    return;
  }

  try {
    const batchIDInt = parseInt(batchId);
    const batch = await contract.fetchBatch(batchIDInt);

    // Process batch details
    const fetchedBatch = {
      id: batch[0].toString(),
      batchType: batch[1],
      description: batch[2],
      price: ethers.utils.formatEther(batch[3]), // Convert price from Wei to Ether
      status: formatStatus(batch[4]) // Format the status field
    };

    setBatchDetails(fetchedBatch);
  } catch (error) {
    console.error("Error fetching batch details:", error);
    alert("Error fetching batch details. Please ensure the Batch ID is correct.");
  }
 };


 // Format the status field with readable dates
 const formatStatus = (status) => {
  if (!status) return [];
  try {
    return status.split(" -> ").map((entry) => {
      const [statusText, timestamp] = entry.split(" - ");
      const formattedDate = new Date(parseInt(timestamp) * 1000).toLocaleString();
      return { status: statusText, date: formattedDate };
    });
  } catch (error) {
    console.error("Error formatting status:", error);
    return [];
  }
 };


 return (
   <div className="page-container">
     <h2>Fetch Batch Details</h2>
     <input
       type="text"
       placeholder="Enter Batch ID"
       value={batchId}
       onChange={(e) => setBatchId(e.target.value)}
     />
     <button onClick={fetchDetails}>Fetch Details</button>


     {batchDetails && (
       <div className="product-details-section">
         <h3 className="product-details-title">Batch Details</h3>
         <p className="product-info"><strong>ID:</strong> {batchDetails.id}</p>
         <p className="product-info"><strong>Type:</strong> {batchDetails.batchType}</p>
         <p className="product-info"><strong>Description:</strong> {batchDetails.description}</p>
         <p className="product-info"><strong>Price:</strong> {batchDetails.price} ETH</p>
         <h4 className="status-updates-title">Status Updates:</h4>
         <table className="status-table">
           <thead>
             <tr>
               <th>Status</th>
               <th>Timestamp</th>
             </tr>
           </thead>
           <tbody>
             {batchDetails.status.map((update, index) => (
               <tr key={index}>
                 <td>{update.status}</td>
                 <td>{update.date}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     )}
   </div>
 );
}


export default FetchProductDetailsPage;



