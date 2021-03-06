const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify.js")

module.exports = async ({ deployments, getNamedAccounts }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const usd = await deploy("StableCoin", {
        from: deployer,
        log: true,
        args: [],
    })

    const wizard = await deploy("Wizard", {
        from: deployer,
        log: true,
        args: [],
    })

    const elf = await deploy("Elf", {
        from: deployer,
        log: true,
        args: [],
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying...")
        await verify(usd.address, [], "contracts/stablecoin.sol:StableCoin")
        await verify(wizard.address, [], "contracts/wizard.sol:Wizard")
        await verify(elf.address, [], "contracts/elf.sol:Elf")
    }
    log("--------------------------")
}
module.exports.tags = ["all", "tokens"]
