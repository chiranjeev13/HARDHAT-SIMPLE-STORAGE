const { ethers, run, network } = require("hardhat");

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying Contract");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Contract Address ${simpleStorage.address}`);
  if (network.config.chainId == 4 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmation");
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
  const currentFavNum = await simpleStorage.retrieve();
  console.log(`Current Favnum: ${currentFavNum}`);

  const txResponse = await simpleStorage.store(76);
  await txResponse.wait(1);
  const updatedFavNum = await simpleStorage.retrieve();
  console.log(`Updated Favnum: ${updatedFavNum}`);
}

async function verify(contractAddress, args) {
  console.log("Verifying Contract");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArgumanets: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!!");
    } else {
      console.log(e);
    }
  }
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
