// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RockPaperScissors_BNB_Challenge {
    enum Hand { None, Rock, Paper, Scissors }
    enum Status { None, Created, Joined, Played }

    struct Game {
        address payable player1;
        address payable player2;
        uint bet;
        Hand hand1;
        Hand hand2;
        Status status;
    }

    mapping (address => Game) public games;
    mapping (uint256 => address) public gamesById;
    uint256 public gameId;

    function createGame() public payable returns (uint256) {
        require(msg.value > 0, "Bet amount must be greater than zero.");
        gameId++;
        games[msg.sender].player1 = payable(msg.sender);
        games[msg.sender].bet = msg.value;
        games[msg.sender].status = Status.Created;
        gamesById[gameId] = msg.sender;
        return gameId;
    }

    function joinGame(uint256 id) public payable {
        Game storage game = games[gamesById[id]];
        require(game.status == Status.Created, "Game not available for joining.");
        require(msg.sender != game.player1, "You cannot join your own game.");
        require(msg.value == game.bet, "Bet amount must match the first player's bet.");

        game.player2 = payable(msg.sender);
        game.status = Status.Joined;
    }

    function playGame(uint256 id, Hand hand) public {
        Game storage game = games[gamesById[id]];
        require(game.status == Status.Joined, "Game not ready to be played.");
        require(msg.sender == game.player1 || msg.sender == game.player2, "You are not a player in this game.");
        require(hand >= Hand.Rock && hand <= Hand.Scissors, "Invalid hand played.");

        if (msg.sender == game.player1) {
            game.hand1 = hand;
        } else {
            game.hand2 = hand;
        }

        if (game.hand1 != Hand.None && game.hand2 != Hand.None) {
            endGame(id);
        }
    }

    function endGame(uint256 id) private {
        Game storage game = games[gamesById[id]];
        Hand winnerHand = determineWinner(game.hand1, game.hand2);
        address payable winner = winnerHand == Hand.Rock ? game.player1 :
                         winnerHand == Hand.Paper ? game.player2 :
                         payable(address(0));
        if (winner != address(0)) {
            winner.transfer(game.bet * 2);
        } else {
            game.player1.transfer(game.bet);
            game.player2.transfer(game.bet);
        }
        resetGame(id);
    }

    function resetGame(uint256 id) private {
        Game storage game = games[gamesById[id]];
        game.hand1 = Hand.None;
        game.hand2 = Hand.None;
        game.status = Status.None;
        game.bet = 0;
    }

    function determineWinner(Hand hand1, Hand hand2) private pure returns (Hand) {
        if (hand1 == Hand.Rock && hand2 == Hand.Scissors ||
            hand1 == Hand.Paper && hand2 == Hand.Rock ||
            hand1 == Hand.Scissors && hand2 == Hand.Paper) {
            return hand1;
        }
        if (hand2 == Hand.Rock && hand1 == Hand.Scissors ||
            hand2 == Hand.Paper && hand1 == Hand.Rock ||
            hand2 == Hand.Scissors && hand1 == Hand.Paper) {
            return hand2;
        }
        return Hand.None;
    }
}
