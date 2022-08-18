
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile.js')

const provider = new HDWalletProvider(
    'SECRET PHRASE',
    'https://rinkeby.infura.io/v3/75f17e3ccda245afa1894e0953d54f96'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[1]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments:['Hi there!'] })
    .send({ from: accounts[1], gas: '1000000' });

    console.log('Contract deployed to: ', result.options.address);
    //To prevent a hanging deployment:
    provider.engine.stop()
};
deploy();
