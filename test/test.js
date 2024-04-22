
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenSwapper", function() {
  let deployer;
  let tokenSwapper;

  beforeEach(async function() {
    // Get the deployer account
    [deployer] = await ethers.getSigners();

    // Deploy the TokenSwapper contract
    const TokenSwapper = await ethers.getContractFactory("TokenSwapper");
    tokenSwapper = await TokenSwapper.deploy();

    // The forked mainnet will already have the Uniswap V2 Router deployed and operational
  });

  it("should swap WBTC to USDC", async function() {
    // Simulate a transfer of WBTC to the deployer address (this wouldn't normally work on a mainnet fork without real token balances)
    const wbtcAmount = ethers.utils.parseUnits("1", 8); // WBTC has 8 decimals

    // Approve the token swapper to spend WBTC
    const wbtcToken = await ethers.getContractAt("IERC20", "0x577D296678535e4903D59A4C929B718e1D575e0A");
    await wbtcToken.connect(deployer).approve(tokenSwapper.address, wbtcAmount);

    // Call the swap function
    await expect(tokenSwapper.swapWBTCtoUSDC(wbtcAmount))
      .to.emit(tokenSwapper, 'SwapExecuted') // You would need to add this event in your Solidity contract
      .withArgs(deployer.address, wbtcAmount);
  });
});
