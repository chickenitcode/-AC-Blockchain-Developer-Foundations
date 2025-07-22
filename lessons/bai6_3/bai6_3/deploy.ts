import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  await myNFT.deployed();
  console.log("MyNFT deployed to:", myNFT.address);

  // Mint 1 NFT cho deployer
  const tx = await myNFT.mint(deployer.address);
  await tx.wait();
  console.log("Minted NFT #0 to:", deployer.address);

  // In ownerOf(0)
  const owner = await myNFT.ownerOf(0);
  console.log("ownerOf(0):", owner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 