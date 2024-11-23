// src/pages/AddProductPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import '../App.css';

function AddProductPage() {
    // State variables for interacting with blockchain
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);

    // State variables for form inputs
    const [batchID, setBatchID] = useState('');
    const [batchType, setBatchType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    
    const navigate = useNavigate();

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
    
    

    // Initialize connection to the Ethereum wallet and smart contract
    useEffect(() => {
        const connectWallet = async () => {
            try {
                // Request connection to Ethereum provider (e.g., MetaMask)
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner(); // Get signer for transaction signing
                setProvider(provider);
                setSigner(signer);

                // Get the user's Ethereum address
                const accountAddress = await signer.getAddress();
                setAccount(accountAddress);

                // Connect to the contract using signer
                const contract = new ethers.Contract(contractAddress, abi, signer);
                setContract(contract);
            } catch (error) {
                console.error("Error connecting to wallet: ", error);
            }
        };
        connectWallet();
    }, []);

    // Function to add a batch to the blockchain
    const handleAddBatch = async () => {
        if (batchID && batchType && description && price) {
            try {
                // Call the contract's addBatch function with form inputs
                const tx = await contract.addBatch(
                    batchID,
                    batchType,
                    description,
                    ethers.utils.parseEther(price.toString()) // Convert price to Ether units
                );
                await tx.wait(); // Wait for the transaction to be confirmed

                // Alert user of successful addition
                alert(`Batch Added:\nID: ${batchID}\nType: ${batchType}\nDescription: ${description}\nPrice: ${price} ETH`);

                // Reset form fields
                setBatchID('');
                setBatchType('');
                setDescription('');
                setPrice('');
            } catch (error) {
                console.error("Error adding batch", error);
                alert("Failed to add batch. Please try again.");
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    // Function to navigate back to the main actions page
    const handleBack = () => {
        navigate('/mainaction');
    };

    return (
        <div className="page-container">
            <h2>Add Batch</h2>
            <input
                type="text"
                placeholder="Batch ID"
                value={batchID}
                onChange={(e) => setBatchID(e.target.value)}
            />
            <select
                value={batchType}
                onChange={(e) => setBatchType(e.target.value)}
                className="select-field"
            >
                <option className="select-field"  value="vegetables">Vegetables</option>
                <option className="select-field" value="fruits">Fruits</option>
                <option  className="select-field" value="pulses">Pulses</option>
            </select>
            <input
                type="text"
                placeholder="Price in ETH"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleAddBatch}>Add Batch</button>
            <button onClick={handleBack} style={{ marginTop: '10px' }}>Back</button>
        </div>
    );
}

export default AddProductPage;
