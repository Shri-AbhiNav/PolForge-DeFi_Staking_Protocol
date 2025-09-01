// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NativeStaking is ReentrancyGuard {
    address public immutable rootAddress;
    address public owner;
    uint256 public totalStaked;
    uint256 public totalDeposit;

    mapping(address => uint256) public userStakedAmount;
    mapping(address => UserInfo) public registeredUser;
    mapping(address => StakingInfo[]) private userStakes;
    mapping(address => address[]) private userReferrals;

    struct StakingInfo {
        uint256 amount;
        uint256 timestamp;
    }

    struct UserInfo {
        address sponsor;
        uint256 timestamp;
        bool exist;
    }

    struct TransferInfo {
        address recipient;
        uint256 amount;
    }

    event Staked(address indexed user, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event UserRegistered(address indexed user, address indexed referrer, uint256 stakeAmount);
    event BatchTransfer(address indexed recipient, uint256 amount);
    event TransferFailed(address indexed recipient, uint256 amount);
    event DepositReceived(address indexed sender, uint256 amount);

    constructor(address _rootAddress) {
        require(_rootAddress != address(0), "Root address cannot be zero");
        owner = msg.sender;
        rootAddress = _rootAddress;
        registeredUser[_rootAddress] = UserInfo({
            sponsor: address(0),
            timestamp: block.timestamp,
            exist: true
        });
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    modifier onlyRegistered(address user) {
        require(registeredUser[user].exist, "User is not registered");
        _;
    }

    function signUp(address user, address referrer) external payable nonReentrant {
        require(user != address(0) && referrer != user, "Invalid user or referrer");
        require(!registeredUser[user].exist, "User is already registered");
        require(registeredUser[referrer].exist, "Referrer must be registered");

        registeredUser[user] = UserInfo({
            sponsor: referrer,
            timestamp: block.timestamp,
            exist: true
        });

        userReferrals[referrer].push(user);

        if (msg.value > 0) {
            _stake(user, msg.value);
        }

        emit UserRegistered(user, referrer, msg.value);
    }

    function _stake(address user, uint256 amount) internal {
        require(amount > 0, "Stake amount must be greater than zero");

        userStakedAmount[user] += amount;
        totalStaked += amount;

        userStakes[user].push(StakingInfo(amount, block.timestamp));

        emit Staked(user, amount);
    }

    function stake(address user) external payable onlyRegistered(user) nonReentrant {
        _stake(user, msg.value);
    }

    function getUserStakes(address user) external view returns (uint256[] memory amounts, uint256[] memory timestamps) {
        require(user != address(0), "Invalid user address");

        StakingInfo[] memory stakes = userStakes[user];
        uint256 length = stakes.length;
        amounts = new uint256[](length);
        timestamps = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            amounts[i] = stakes[i].amount;
            timestamps[i] = stakes[i].timestamp;
        }
    }

    function transfer(address to, uint256 amount) external onlyOwner nonReentrant {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Transfer amount must be greater than zero");
        require(address(this).balance >= amount, "Insufficient contract balance");

        (bool success, ) = to.call{value: amount}("");
        require(success, "Transfer failed");
    }

    function deposit() external payable {
        require(msg.value > 0, "Deposit amount must be greater than zero");
        totalDeposit += msg.value;
        emit DepositReceived(msg.sender, msg.value);
    }

    function setOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function batchTransfer(TransferInfo[] calldata transfers) external onlyOwner nonReentrant {
        uint256 totalAmount = 0;

        for (uint256 i = 0; i < transfers.length; i++) {
            totalAmount += transfers[i].amount;
        }

        require(address(this).balance >= totalAmount, "Insufficient balance for batch transfer");

        for (uint256 i = 0; i < transfers.length; i++) {
            address recipient = transfers[i].recipient;
            uint256 amount = transfers[i].amount;

            bool success = _safeTransfer(recipient, amount);

            if (!success) {
                emit TransferFailed(recipient, amount);
            } else {
                emit BatchTransfer(recipient, amount);
            }
        }
    }

    function _safeTransfer(address to, uint256 amount) internal returns (bool success) {
        (success, ) = to.call{value: amount}("");
        return success;
    }

    function balanceOfContract() external view returns (uint256) {
        return address(this).balance;
    }

    function getReferrals(address user) external view returns (address[] memory referrals, uint256[] memory timestamps) {
        require(user != address(0), "Invalid user address");
        require(registeredUser[user].exist, "User is not registered");

        address[] memory refs = userReferrals[user];
        uint256 length = refs.length;
        timestamps = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            timestamps[i] = registeredUser[refs[i]].timestamp;
        }

        return (refs, timestamps);
    }

    receive() external payable {
        revert("Direct payments not allowed");
    }

    fallback() external payable {
        revert("Fallback function executed");
    }
}