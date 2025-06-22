// DOM Elements
const boxes = document.querySelectorAll('.box'); // Select all your box buttons
const resetButton = document.getElementById('resetBtn');
const statusDisplay = document.getElementById('status');
const messageContainer = document.querySelector('.msg-container');
const messageText = document.getElementById('msg');
const newGameButton = document.getElementById('new-btn'); // For the "New Game" button in msg-container

// Game State Variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning Conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function play_sound(which_sound) {
    switch (which_sound) {
        case '1':
            // Play sound for player X
            const soundX = new Audio('music/x.ogg');
            soundX.play();
            break;
        case '2':
            // Play sound for player O
            const soundO = new Audio('music/o.ogg');
            soundO.play();
            break;
        case '3':
            // Play sound for win
            const soundWin = new Audio('music/win.ogg');
            soundWin.play();
            break;
        case '4':
            // Play sound for draw
            const soundDraw = new Audio('music/draw.ogg');
            soundDraw.play();
            break;
        default:
            console.error('Invalid sound option');
            break;
    }
}

// Function to handle a cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index); // Get the data-index


    // Check if the cell is already played or if the game is over
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return; // Do nothing if invalid move
    }

    // Update the game state
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer; // Update the UI

    play_sound(currentPlayer === 'X' ? '1' : '2'); // Play sound for the current player

    checkGameStatus(); // Check for win or draw
    if (gameActive) { // Only switch player if game is still active
        switchPlayer();
    }
}

// Function to switch players
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `${currentPlayer}'s turn`;
}

// Function to check for win or draw
function checkGameStatus() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue; // Skip if any cell in the condition is empty
        }
        if (a === b && b === c) {
            roundWon = true;
            break; // Found a winner
        }
    }

    if (roundWon) {
        messageText.textContent = `Player ${currentPlayer} Wins!`;
        messageContainer.classList.remove('hidden');
        gameActive = false;
        play_sound('3'); // Play win sound
        return;
    }

    // Check for draw (if all cells are filled and no one has won)
    let roundDraw = !board.includes('');
    if (roundDraw) {
        messageText.textContent = `It's a Draw!`;
        messageContainer.classList.remove('hidden');
        gameActive = false;
        play_sound('4'); // Play draw sound
        return;
    }
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Clear the board array
    currentPlayer = 'X'; // Reset current player
    gameActive = true; // Set game to active
    messageContainer.classList.add('hidden'); // Hide win/draw message
    statusDisplay.textContent = `${currentPlayer}'s turn`; // Update status

    // Clear content of all boxes
    boxes.forEach(box => {
        box.textContent = '';
    });
}

// Event Listeners
boxes.forEach(box => {
    box.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', resetGame); // For the new game button in the message container

// Initial status display
statusDisplay.textContent = `${currentPlayer}'s turn`;