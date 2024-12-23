let currentPlayer = 'X';
let gameOver = false;
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
const cells = document.querySelectorAll('.cell');

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            gameOver = true;
            statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
            return;
        }
    }

    // Check for tie
    if (Array.from(cells).every(cell => cell.textContent)) {
        gameOver = true;
        statusDisplay.textContent = 'It\'s a Tie!';
    }
}

function handleClick(event) {
    if (gameOver || event.target.textContent) return;

    event.target.textContent = currentPlayer;
    event.target.classList.add('clicked');
    checkWinner();

    if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameOver = false;
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('clicked');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);