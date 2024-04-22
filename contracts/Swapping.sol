// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

import "./interfaces/IUniswapV2Router01.sol";
import "./interfaces/IERC20.sol";

contract TokenSwapper {
    address private constant UNISWAP_V2_ROUTER = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WBTC = 0x577D296678535e4903D59A4C929B718e1D575e0A;
    address private constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    // Target wallet where USDC will be sent after swap
    address private constant HITMARKS_WALLET = msg.sender; //for the testing purpose we set the target address as msg.sender

    IUniswapV2Router01 public uniswapRouter;

    // Event declaration
    event TokenSwap(
        address indexed sender,
        uint256 wbtcAmount,
        uint256 usdcAmount,
        address targetWallet
    );

    constructor() public {
        uniswapRouter = IUniswapV2Router01(UNISWAP_V2_ROUTER);
    }

    function swapWBTCtoUSDC(uint _wbtcAmount) public {
        require(IERC20(WBTC).transferFrom(msg.sender, address(this), _wbtcAmount), "Transfer failed");
        require(IERC20(WBTC).approve(UNISWAP_V2_ROUTER, _wbtcAmount), "Approve failed");

        address[] memory path = new address[](2);
        path[0] = WBTC;
        path[1] = USDC;

        uint deadline = block.timestamp + 300; // using a 5-minute deadline

        uint[] memory amounts = uniswapRouter.getAmountsOut(_wbtcAmount, path);
        uint amountOutMin = amounts[1] * 95 / 100; // Slippage tolerance: 5%

        // Execute the swap and send the USDC to the target wallet
        uniswapRouter.swapExactTokensForTokens(_wbtcAmount, amountOutMin, path, HITMARKS_WALLET, deadline);

        // Emit the event after the swap is successful
        emit TokenSwap(msg.sender, _wbtcAmount, amounts[1], HITMARKS_WALLET);
    }
}
