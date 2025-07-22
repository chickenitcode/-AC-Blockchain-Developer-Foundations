import { ethers } from "ethers";

async function main() {
  console.log("🔍 Connecting to Sepolia network...");

  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address account) public view returns (uint256)",
    "function decimals() public view returns (uint8)"
  ];

  const contractAddress = "0x691a08E3e0ba9559f9242F90B9cAA898d7cB2C11";

  console.log("📍 MyToken Contract address:", contractAddress);

  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    console.log("📞 Calling ERC20 functions...");
    
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const decimals = await contract.decimals();
    
    console.log("📊 Token Name:", name);
    console.log("📊 Token Symbol:", symbol);
    console.log("📊 Total Supply:", ethers.formatUnits(totalSupply, decimals));
    console.log("📊 Decimals:", decimals);

    const deployerAddress = "0xe643D1908b95fdd7DC4981821279352a194Ddc2B";
    const balance = await contract.balanceOf(deployerAddress);
    console.log("📊 Deployer Balance:", ethers.formatUnits(balance, decimals), symbol);

    const network = await provider.getNetwork();
    console.log("🌐 Network:", network.name, "Chain ID:", network.chainId);

    console.log("✅ Successfully connected to MyToken contract via ABI!");
    
  } catch (error) {
    console.error("❌ Error calling contract:", error);
  }
}

main().catch(console.error);

// 0xb27A31f1b0AF2946B7F582768f03239b1eC07c2c
// 0x691a08E3e0ba9559f9242F90B9cAA898d7cB2C11