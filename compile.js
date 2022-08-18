// compile code will go here
const path = require('path');
const fs = require('fs'); // files system module
const solc = require('solc'); // solidity compiler

// Filepath to inbox/contracts/Inbox.sol
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');

// Read in the contents of the file in the filepath
const source = fs.readFileSync(inboxPath, 'utf8');

// solc.compile(source, number of contracts to compile)
// once we compile, we want to make it available to other files - `module.exports`
module.exports = solc.compile(source, 1).contracts[':Inbox'];

// To run the file, in terminal: `node compile.js`