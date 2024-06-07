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
    let TOKEN_ADDRESS = "0x3B63e464507A17847778bbEC78308ca6333B6B5D"; //CAMBIA l'indirizzo

    if (IS_UPGRADE) {
      console.log("Token is being updated...");
      const tokenInstance = await upgradeProxy(TOKEN_ADDRESS, Token2, {
        from: deployer,
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
    let IS_UPGRADE = false;
    let TOKEN_ADDRESS;

    if (IS_UPGRADE) {
      console.log("Token is being updated...");
      const tokenInstance = await upgradeProxy(TOKEN_ADDRESS, Token2, {
        from: deployer,
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
