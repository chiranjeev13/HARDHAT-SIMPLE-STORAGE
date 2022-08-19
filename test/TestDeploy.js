const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

describe("SimpleStorage", function () {
  let SimpleStorageFactory, simpleStorage;
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorageFactory.deploy();
  });
  it("Should start with a 0", async function () {
    const currentFavNum = await simpleStorage.retrieve();
    const expectedValue = "0";
    assert.equal(currentFavNum.toString(), expectedValue);
  });
  it("Should update the value to 76", async function () {
    const txResponse = await simpleStorage.store(76);
    await txResponse.wait(1);
    const updatedFavNum = await simpleStorage.retrieve();
    assert.equal("76", updatedFavNum);
  });
});
