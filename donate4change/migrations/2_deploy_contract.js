const vote = artifacts.require("Donation");
module.exports = function(deployer) {
    deployer.deploy(vote);
};