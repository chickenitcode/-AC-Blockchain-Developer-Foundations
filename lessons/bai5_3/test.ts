import { ethers } from "ethers";

async function main() {

  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  const abi = [
    "function getCount() public view returns (uint)",
    "function increment() public",
    "function count() public view returns (uint)"
  ];

  const contractAddress = "0xe02DaB960Fa303618E808d65baa21bAe46490eEb";

  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    const count = await contract.getCount();

    const network = await provider.getNetwork();
    console.log("🌐 Network:", network.name, "Chain ID:", network.chainId);

    
  } catch (error) {
    console.error("Error calling contract:", error);
  }
}

main().catch(console.error);