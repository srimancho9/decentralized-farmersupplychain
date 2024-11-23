// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    address owner;

    struct Batch {
        uint256 batchID;
        string batchType; // e.g., vegetables, fruits, pulses
        string description;
        uint256 price;
        string status; // Status with appended updates and timestamps
    }

    mapping(uint256 => Batch) private batches; // Mapping to store batches by their ID
    mapping(address => bool) private authorizedProviders; // Mapping to authorize providers
    uint256[] private batchIDs; // Array to keep track of all batch IDs

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this function");
        _;
    }

    modifier onlyAuthorizedProvider() {
        require(authorizedProviders[msg.sender], "Not an authorized provider");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Function to get the contract owner
    function getOwner() public view returns (address) {
        return owner;
    }

    // Function to authorize a provider
    function authorizeProvider(address provider) public onlyOwner {
        authorizedProviders[provider] = true;
    }

    // Function to add a new batch
    function addBatch(
        uint256 batchID,
        string memory batchType,
        string memory description,
        uint256 price
    ) public  {
        require(batches[batchID].batchID == 0, "Batch already exists");

        // Initialize batch with status as "sourcing" and current timestamp
        batches[batchID] = Batch({
            batchID: batchID,
            batchType: batchType,
            description: description,
            price: price,
            status: string(abi.encodePacked("sourcing - ", uint2str(block.timestamp)))
        });

        batchIDs.push(batchID); // Add batchID to batchIDs array
    }

    // Function to fetch batch details by batch ID
    function fetchBatch(uint256 batchID) public view returns (uint256, string memory, string memory, uint256, string memory) {
        require(batches[batchID].batchID != 0, "Batch not found");
        Batch memory batch = batches[batchID];
        return (batch.batchID, batch.batchType, batch.description, batch.price, batch.status);
    }

    // Function to update the batch status
    function updateBatchStatus(uint256 batchID, string memory newStatus) public  {
        require(batches[batchID].batchID != 0, "Batch not found");

        // Append new status and timestamp to the existing status
        batches[batchID].status = string(
            abi.encodePacked(batches[batchID].status, " -> ", newStatus, " - ", uint2str(block.timestamp))
        );
    }

    // Function to fetch all batches
    function getAllBatches() public view returns (Batch[] memory) {
        Batch[] memory allBatches = new Batch[](batchIDs.length);
        for (uint256 i = 0; i < batchIDs.length; i++) {
            allBatches[i] = batches[batchIDs[i]];
        }
        return allBatches;
    }

    // Helper function to convert uint to string
    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 temp = _i;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (_i != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(_i % 10)));
            _i /= 10;
        }
        return string(buffer);
    }
}
