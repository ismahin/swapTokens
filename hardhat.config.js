require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.19",  // Add this if you have contracts that need this exact version
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ],
    overrides: {
      "contracts/Swapping.sol": {
        version: "0.6.6",  // Ensure this matches the pragma in Swapping.sol
        settings: {}
      },
      "contracts/libraries/UniswapV2Library.sol": {
        version: "0.6.6",  // Ensure this matches the pragma in the library
        settings: {}
      }
    }
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/zCYxriXHVJviy48CvHhL0ndqJTxmW7Vn"
      }
    }
  }
};
