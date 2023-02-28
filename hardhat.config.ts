import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "hardhat-deploy";

const accounts =
{
	mnemonic:
		process.env.MNEMONIC ||
		"test test test test test test test test test test test junk"
	// accountsBalance: ethers.utils.parseEther("1");
};

const config: HardhatUserConfig =
{
	abiExporter:
	[
		{
			runOnCompile: true,
			path: "./abi/json",
			clear: true,
			flat: false,
			format: "json"
		},
		{
			runOnCompile: true,
			path: "./abi/compact",
			clear: true,
			flat: false,
			format: "fullName"
		},
	],
	contractSizer:
	{
		runOnCompile: true
	},
	etherscan: { apiKey: process.env.ETHERSCAN_API_KEY },
	gasReporter:
	{
		enabled: process.env.REPORT_GAS === "true",
		coinmarketcap: process.env.COINMARKETCAP_API_KEY,
		currency: "EUR",
		excludeContracts:
		[
			"contracts/mocks/"
		]
	},
	mocha:
	{
		timeout: 3600000 // 1h = 60m = 3 600s = 3 600 000ms
	},
	namedAccounts:
	{
		deployer: { default: process.env.OWNER ?? 0 },
		developer: { default: process.env.DEVELOPER ?? 1 }
	},
	networks:
	{
		mainnet: {
			url: `https://eth.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
			gasPrice: 8000000000, // 8 gwei
			accounts
		},
		goerli: {
			url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
			accounts
		}
		// hardhat:
		// {
		// chainId: 31337,
		// forking: { url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}` },
		// accounts
		// }
	},
	solidity: "0.8.17",
};

export default config;
