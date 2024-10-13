// Factories - 
const createPlayer = (name, gameSymbol ) =>
{
    return { name, gameSymbol };
}

// IIFE's
const GameBoard = (() =>
{
    // GameBoard HAS-A array that we will keep 'private' (no accessibility outside),
    // Used to store the gameboard state
    let gameBoardArray = ["", "", "", "", "", "", "", "", ""];
    // This is the gameboard element in our doc we would like to apply HTML to, will place the
    // proper html based on the gameBoardArray state
    let gameBoardHTML = document.querySelector('#gameboard');

    // This we will allow accessibility outside this IFFE to render the game
    const render = () =>
    {
        let boardSetupHTML = "";
        gameBoardArray.forEach((square, index) =>
        {
            boardSetupHTML += `<div class="square" id="square-${index}">${square}</div>`;
        });
        gameBoardHTML.innerHTML = boardSetupHTML;
    };

    const update = (index, gameSymbol) =>
    {
        gameBoardArray[index] = gameSymbol;
        render();
    };

    return { render, update };
})();

const Game = (() =>
{
    let players = [];
    let currentPlayerIndex;
    let gameOver;

    const start = () =>
    {
        players = 
        [
        createPlayer(document.querySelector('#player1').value, 'X'),
        createPlayer(document.querySelector('#player2').value, 'O')
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        GameBoard.render();
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) =>
        {
            square.addEventListener('click', handleClick);
        });
    }

    const handleClick = (event) =>
    {
        let index = parseInt(event.target.id.split("-")[1]);
        GameBoard.update(index, players[currentPlayerIndex].gameSymbol);
    }

    return { start, handleClick };
})();

const startButton = document.querySelector('#start-button');
startButton.addEventListener('click', () =>
{
    Game.start();
});