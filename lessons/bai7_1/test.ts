import { ethers } from "ethers";

async function main() {
  console.log("Connecting to Sepolia network...");

  // Kết nối tới Sepolia
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.public.blastapi.io");

  // ABI các hàm cần dùng
  const abi = [
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint8)",
    "function totalSupply() public view returns (uint256)",
    "function balanceOf(address account) public view returns (uint256)",
    "function mint(address to, uint256 amount) external",
    "function owner() public view returns (address)"
  ];

  // Địa chỉ contract và private key
  const contractAddress = "0xE6928C142126d3E746346e5510bDC18e70626Ba8";
  const privateKey = "0xfcb7b0d1bd230cf089b77b5d526a81a80137d6c3dd70f1b2611b3d20d3d828fb";
  const wallet = new ethers.Wallet(privateKey, provider);
  const deployerAddress = wallet.address;

  console.log("📍 MyMintableToken Contract address:", contractAddress);
  console.log("📍 Deployer Address:", deployerAddress);

  // Tạo instance contract
  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    // Đọc thông tin token
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const totalSupply = await contract.totalSupply();

    console.log("📊 Token Name:", name);
    console.log("📊 Token Symbol:", symbol);
    console.log("📊 Decimals:", decimals.toString());
    console.log("📊 Total Supply:", ethers.formatUnits(totalSupply, decimals));

    // Đọc balance của deployer
    const balance = await contract.balanceOf(deployerAddress);
    console.log("📊 Deployer Balance:", ethers.formatUnits(balance, decimals), symbol);

    // Đọc owner
    const owner = await contract.owner();
    console.log("👑 Contract Owner:", owner);
    console.log("🔍 Is Deployer Owner?", owner.toLowerCase() === deployerAddress.toLowerCase());

    // Nếu là owner thì mint 1000 token cho deployer
    if (owner.toLowerCase() === deployerAddress.toLowerCase()) {
      const contractWithSigner = contract.connect(wallet);
      const mintAmount = ethers.parseUnits("1000", decimals);
      console.log("🚀 Minting 1000 tokens to deployer...");
      const tx = await (contractWithSigner as any).mint(deployerAddress, mintAmount);
      await tx.wait();
      console.log("✅ Minted 1000 tokens!");
      // In lại balance
      const newBalance = await contract.balanceOf(deployerAddress);
      console.log("📊 Deployer Balance after mint:", ethers.formatUnits(newBalance, decimals), symbol);
    } else {
      console.log("⚠️ Deployer is not the owner. Skipping mint.");
    }

    // Thông tin mạng
    const network = await provider.getNetwork();
    console.log("🌐 Network:", network.name, "Chain ID:", network.chainId);
    console.log("✅ Successfully connected to MyMintableToken contract!");
  } catch (error) {
    console.error("❌ Error calling contract:", error);
  }
}

main().catch(console.error);
