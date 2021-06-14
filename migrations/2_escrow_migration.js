const Escrow = artifacts.require("Escrow");


let price = "1";

module.exports = async (deployer, network, accounts) => {
  await deployer.deploy(Escrow, accounts[0], accounts[1], price);
};
