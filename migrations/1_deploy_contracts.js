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
    // QUESTE VARIABILI SOTTOSTANTI SI CAMBIANO AL MOMENTO DEL PRIMO DEPLOY EFFETTUATO
    //SETTANDO A TRUE IS_UPGRADE
    //SETTANDO L'INDIRIZZO DEL TOKEN AD TOKEN_ADDRESS
    //IN MODO DA FARE L'UPGRADE AL LANCIO DEL NUOVO TEST
    let IS_UPGRADE = false;
    let TOKEN_ADDRESS = "0x0"; //CAMBIA l'indirizzo

    if (IS_UPGRADE) {
      console.log("Token is being updated...");
      const tokenInstance = await upgradeProxy(TOKEN_ADDRESS, Token2, {
        deployer,
      });
      console.log(`New token deployed @: ${tokenInstance.address}`);
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
    let IS_UPGRADE = true;
    let TOKEN_ADDRESS;

    if (IS_UPGRADE) {
      console.log("Token is being updated...");
      const tokenInstance = await upgradeProxy(TOKEN_ADDRESS, Token2, {
        deployer,
      });
      console.log(`New token deployed @: ${tokenInstance.address}`);
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
