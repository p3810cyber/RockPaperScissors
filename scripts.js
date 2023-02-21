var web3 = new Web3(Web3.givenProvider, 97);

var contractAddress = '0x8dE4DC5830859221B29B614a67d11F30459908Ca';
var contractAbi = [
    {
        "inputs": [],
        "name": "createGame",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "gameId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "games",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "player1",
                "type": "address"
            },
            {
                "internalType": "address payable",
                "name": "player2",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "bet",
                "type": "uint256"
            },
            {
                "internalType": "enum RockPaperScissors_BNB_Challenge.Hand",
                "name": "hand1",
                "type": "uint8"
            },
            {
                "internalType": "enum RockPaperScissors_BNB_Challenge.Hand",
                "name": "hand2",
                "type": "uint8"
            },
            {
                "internalType": "enum RockPaperScissors_BNB_Challenge.Status",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "gamesById",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "joinGame",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "enum RockPaperScissors_BNB_Challenge.Hand",
                "name": "hand",
                "type": "uint8"
            }
        ],
        "name": "playGame",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var contract = new web3.eth.Contract(contractAbi, contractAddress);
var accounts;

async function init() {
    accounts = await web3.eth.getAccounts();
}

async function createGame() {
    var bet = parseInt(document.getElementById("bet").value);
    await contract.methods.createGame().send({ from: accounts[0], value: bet });
}

async function joinGame() {
    var id = parseInt(document.getElementById("id").value);
    var bet = parseInt(document.getElementById("bet").value);
    await contract.methods.joinGame(id).send({ from: accounts[0], value: bet });
}

async function playHand() {
    var id = parseInt(document.getElementById("id").value);
    var hand = parseInt(document.getElementById("hand").value);
    await contract.methods.playGame(id, hand).send({ from: accounts[0] });
}
