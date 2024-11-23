/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.27",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x109bf15db7731784977d396ea5b35afeb5cec6e8ee5a43ceacb8c64edf78ab46", // Private key 2
        "0x7c5999d66f8366c01e09e074dd2ba9c0b0e26ccc7e0366f06ef56850283c3338"  // Private key 1
      ],
    },
  },
};
