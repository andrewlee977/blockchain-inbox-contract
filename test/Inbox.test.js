// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile.js');
require('dotenv').config();

const web3 = new Web3(ganache.provider());

/*example with a promise
beforeEach (() => {
    // Every function in web3 is asynchronous is nature. Always going to return a promise
    // Get a list of all accounts
    web3.eth.getAccounts()
        .then(fetchedAccounts => {
            console.log(fetchedAccounts);
        });
});*/

// example with async/await
let accounts;
let inbox;
let INITIAL_STRING = 'Hi there!'

beforeEach (async () => {
    // Every function in web3 is asynchronous is nature. Always going to return a promise
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of the returned accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        // Check if inbox.options.address exists (not null or undefined)
        assert.ok(inbox.options.address);
    });

    // async because calling a function in the contract
    it('has initial message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(INITIAL_STRING, message);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('My second message').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert("My second message", message);
    });

});

/*
class Car {
    park() {
        return 'stopped';
    }

    drive() {
        return 'vroom';
    }
}

let car;

beforeEach(() => {
    car = new Car();
});

describe('Car', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', () => { 
        assert.equal(car.drive(), 'vroom');
    })
});
*/