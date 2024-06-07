const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const {
  BN,
  constants,
  expectEvent,
  expectRevert,
  time,
} = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

const Token = artifacts.require("Token");
const Token2 = artifacts.require("Token2");

module.exports = async (deployer, network, accounts) => {
  deployer = accounts[0];

  const tokenName = "MasterZDev Token";
  const tokenSymbol = "MZD";
  const totalSupply = 100000;

  if (network === "development") {
    // QUI INSERISCI FALSE AL DEPLOY DEL PRIMO TOKEN
    // TRUE ALL'UPGRADE CON UN NUOVO TOKEN
    // E L'INDIRIZZO DEL TOKEN DA AGGIORNARE
    let IS_UPGRADE = true;
    let TOKEN_ADDRESS = "0x25594dE9A52eB44005771d82b9deB3fb2f558738"; //CAMBIA l'indirizzo

    if (IS_UPGRADE) {
      console.log("Token is being updated...");
      const tokenInstance = await upgradeProxy(TOKEN_ADDRESS, Token2, {
        from: deployer,
      });
      console.log(`New token deployed @: ${tokenInstance.address}`);

      // Chiamare initializeV2 per impostare la versione a 2
      console.log("Initializing V2...");
      const initializeTx = await tokenInstance.initializeV2({ from: deployer });
      console.log("Initialized V2");

      console.log("Token owner: ", await tokenInstance.owner());
    } else {
      console.log("Token is being deployed...");
      const tokenInstance = await deployProxy(
        Token,
        [tokenName, tokenSymbol, totalSupply],
        { from: deployer }
      );
      console.log(`Token deployed @: ${tokenInstance.address}`);
      console.log("Token owner: ", await tokenInstance.owner());
    }
  } else if (network === "dashboard") {
    let IS_UPGRADE = false;
    let TOKEN_ADDRESS;

    if (IS_UPGRADE) {
      console.log("Token is being updated...");
      const tokenInstance = await upgradeProxy(TOKEN_ADDRESS, Token2, {
        from: deployer,
      });
      console.log(`New token deployed @: ${tokenInstance.address}`);

      // Chiamare initializeV2 per impostare la versione a 2
      console.log("Initializing V2...");
      const initializeTx = await tokenInstance.initializeV2({ from: deployer });
      console.log("Initialized V2");

      console.log("Token owner: ", await tokenInstance.owner());
    } else {
      console.log("Token is being deployed...");
      const tokenInstance = await deployProxy(
        Token,
        [tokenName, tokenSymbol, totalSupply],
        { from: deployer }
      );
      console.log(`Token deployed @: ${tokenInstance.address}`);
      console.log("Token owner: ", await tokenInstance.owner());
    }
  }
};
