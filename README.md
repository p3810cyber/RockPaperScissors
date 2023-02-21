# RockPaperScissors
BNB Challange create smartcontract for RockPaperScissors game

This smart contract is a Solidity implementation of the popular game rock-paper-scissors. The contract allows two players to play against each other, each placing a bet before the start of the game. The winner of the game is determined by the hand played by each player, and the winner receives the sum of both bets.

The contract defines two enums, Hand and Status, which are used to keep track of the players' hands and the status of each game. The Game struct holds all the relevant data for a single game, including the players' addresses, the bet amount, and their chosen hands.

The contract also defines a mapping that stores all the games that have been created, with each game identified by the address of the player who created it. There is also a mapping that stores the game IDs for each game address, making it easier to retrieve the game data later.

The contract has three main functions:

```createGame```: This function is called by the first player to create a new game. The function requires that a positive bet amount be sent along with the function call, and the function returns the unique ID of the new game.
```joinGame```: This function is called by the second player to join an existing game. The function requires that the second player's bet amount matches the first player's bet amount, and that the first player is not trying to join their own game.
```playGame```: This function is called by both players to submit their chosen hand for the game. The function requires that the player is participating in the game, and that a valid hand (rock, paper, or scissors) is chosen. Once both players have submitted their hands, the winner is determined and the bets are transferred to the winner.

There are also two private functions, ```endGame``` and ```resetGame```, which handle the logic for determining the winner and resetting the game state, respectively.
