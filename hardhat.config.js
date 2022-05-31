require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    "artifacts": './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/88dbebf488964d918ed72cd95783498b",
      accounts: [`0x187e376fe84fd2e2ff862e86b88888475c2d0f566df81dca49ee9ae2df48d92f`] 
    },
      /**manera de test, NO hacer nunca asi, estas publicando tu propia clave!!
         accounts: [`0x${process.env.ACCOUNT_KEY}`] // esta variable la tengo en el ./zshrc */
  }
};
