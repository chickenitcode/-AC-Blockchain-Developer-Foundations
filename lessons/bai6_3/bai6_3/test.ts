import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  const MyNFT = await ethers.getContractFactory("MyNFT");
  const myNFT = await MyNFT.deploy();
  await myNFT.deployed();

  // Mint NFT mới cho deployer
  const tx = await myNFT.mint(deployer.address);
  await tx.wait();

  // Lấy owner của tokenId 0
  const owner = await myNFT.ownerOf(0);
  console.log("Owner of tokenId 0:", owner);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 