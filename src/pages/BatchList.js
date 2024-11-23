// src/components/BatchList.js
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';

const BatchList = () => {
    const [provider, setProvider] = useState(null); // Ethereum provider
    const [signer, setSigner] = useState(null);     // Signer for transactions
    const [contract, setContract] = useState(null); // Contract instance
    const [batches, setBatches] = useState([]);     // State to store fetched batches

    const [userAddress, setUserAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

    
  

    // Ethereum contract address and ABI
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
        const connectWalletAndFetchBatches = async () => {
            try {
                // Initialize provider and signer for blockchain interaction
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                setProvider(provider);
                setSigner(signer);
    
                // Create contract instance using ABI, address, and signer
                const contractInstance = new ethers.Contract(contractAddress, abi, signer);
                setContract(contractInstance);
    
                // Fetch all batches from the contract
                const fetchedBatches = await contractInstance.getAllBatches();
                const batchData = fetchedBatches.map(batch => ({
                    batchID: batch.batchID.toString(),
                    batchType: batch.batchType,
                    description: batch.description,
                    price: ethers.utils.formatEther(batch.price), // Convert price from Wei to Ether
                    status: batch.status
                }));
                setBatches(batchData); // Set state with fetched batch data
            } catch (error) {
                console.error("Error connecting to wallet or fetching batches:", error);
                alert("Failed to connect to wallet or fetch batches. Please check the contract connection.");
            }
        };
    
        connectWalletAndFetchBatches();
    }, []); 
    // Connect to Ethereum wallet and contract on component mount
    useEffect(() => {
        const connectWallet = async () => {
            try {
                // Initialize provider and signer for blockchain interaction
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                setProvider(provider);
                setSigner(signer);

                // Create contract instance using ABI, address, and signer
                const contractInstance = new ethers.Contract(contractAddress, abi, signer);
                setContract(contractInstance);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        };
        connectWallet();
    }, []);
    

    const Payment = async () => {

        const totalAmount = 200/100000;

         // Check if MetaMask is installed
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed. Please install MetaMask to proceed.");
        setIsProcessing(false);
        return;
      }

      // Create a new instance of Web3 using the MetaMask provider
      const web3 = new Web3(window.ethereum);

      // Request MetaMask to connect
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3.eth.getAccounts();
      const userAddress = "0x52E548Bd6bA256dc0fc1b5CCc732E21aD7A76939";
      setUserAddress(userAddress);

      // Convert totalPrice to Ether (Assuming 1 ETH = 3000 USD for demo purposes)
      const ethPrice = (totalAmount / 9000000).toFixed(18) ; // Convert USD to Ether

      // Define the transaction parameters
      const transactionParameters = {
        to: "0x09Bea3C88c7F707dDDe238a6bE1C6F250AEfDee0", // Replace with your Ethereum address
        from: userAddress, // MetaMask account
        value: web3.utils.toWei(ethPrice, "ether"), // Convert Ether to Wei
        gas: "20000", // Basic transaction gas limit
      };

      // Send the transaction
      const transactionHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      alert(`transaction successful from ${userAddress}`)



    };


        


    return (
        <div>
            <h2>Batch List</h2>
            {/* Button to fetch all batches from the contract */}
            <table>
                <thead>
                    <tr>
                        <th>Batch ID</th>
                        <th>Product Type</th>
                        <th>Description</th>
                        <th>Price (ETH)</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                            <td>10</td>
                            <td>fruit</td>
                            <td>fruitbatch</td>
                            <td>2 ETH</td>
                            <td>sourcing</td>
                            <td>
                                <button onClick={Payment}>
                                    Pay
                                </button>
                            </td>
                </tbody>
            </table>
        </div>
    );
};

export default BatchList;
