// script.js

document.addEventListener('DOMContentLoaded', () => {
    const singlePlayerBtn = document.getElementById('single-player-btn');
    const twoPlayerBtn = document.getElementById('two-player-btn');
    const singlePlayerMode = document.getElementById('single-player-mode');
    const player1Input = document.getElementById('player1-input');
    const player2Input = document.getElementById('player2-input');
    const playSingleBtn = document.getElementById('play-single');
    const nextToPlayer2Btn = document.getElementById('next-to-player2');
    const playTwoBtn = document.getElementById('play-two');
    const resultDisplay = document.getElementById('result');
    const restartBtn = document.getElementById('restart-btn');

    // Show single player mode
    singlePlayerBtn.addEventListener('click', () => {
        singlePlayerMode.style.display = 'block';
        player1Input.style.display = 'none';
        player2Input.style.display = 'none';
        resultDisplay.textContent = '';
        restartBtn.style.display = 'none';
        singlePlayerBtn.disabled = true;
        twoPlayerBtn.disabled = true;
    });

    // Show two player mode - Step 1: Player 1 Input
    twoPlayerBtn.addEventListener('click', () => {
        player1Input.style.display = 'block';
        player2Input.style.display = 'none';
        singlePlayerMode.style.display = 'none';
        resultDisplay.textContent = '';
        restartBtn.style.display = 'none';
        singlePlayerBtn.disabled = true;
        twoPlayerBtn.disabled = true;
    });

    // Proceed to Player 2 input after Player 1 inputs details
    nextToPlayer2Btn.addEventListener('click', () => {
        const player1Name = document.getElementById('player1-name').value;
        const player1Number = parseInt(document.getElementById('player1-number').value);

        if (player1Name === '' || isNaN(player1Number) || player1Number < 1 || player1Number > 10) {
            resultDisplay.textContent = 'Player 1, please fill in all fields correctly!';
            return;
        }

        player1Input.style.display = 'none';
        player2Input.style.display = 'block';
    });

    // Single Player Mode Logic
    playSingleBtn.addEventListener('click', () => {
        const userName = document.getElementById('user-name').value || 'Player';
        const userNumber = parseInt(document.getElementById('user-number').value);
        const computerNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
        const sum = userNumber + computerNumber;

        if (isNaN(userNumber) || userNumber < 1 || userNumber > 10) {
            resultDisplay.textContent = 'Please enter a valid number between 1 and 10!';
            return;
        }

        const isEven = sum % 2 === 0;
        const outcome = isEven ? 'even' : 'odd';
        const playerOutcome = isEven === (userNumber % 2 === 0) ? `${userName} wins!` : 'Computer wins!';

        resultDisplay.textContent = `${userName}: ${userNumber}, Computer: ${computerNumber}, Sum: ${sum} - ${outcome.toUpperCase()} | ${playerOutcome}`;
        restartBtn.style.display = 'block';
    });

    // Two Player Mode Logic
    playTwoBtn.addEventListener('click', () => {
        const player1Name = document.getElementById('player1-name').value || 'Player 1';
        const player1Number = parseInt(document.getElementById('player1-number').value);
        const player2Name = document.getElementById('player2-name').value || 'Player 2';
        const player2Number = parseInt(document.getElementById('player2-number').value);
        const sum = player1Number + player2Number;

        if (isNaN(player1Number) || player1Number < 1 || player1Number > 10 || isNaN(player2Number) || player2Number < 1 || player2Number > 10) {
            resultDisplay.textContent = 'Please enter valid numbers between 1 and 10 for both players!';
            return;
        }

        const isEven = sum % 2 === 0;
        const outcome = isEven ? 'even' : 'odd';
        const winner = isEven === (player1Number % 2 === 0) ? player1Name : player2Name;

        resultDisplay.textContent = `${player1Name}: ${player1Number}, ${player2Name}: ${player2Number}, Sum: ${sum} - ${outcome.toUpperCase()} | Winner: ${winner}`;
        restartBtn.style.display = 'block';
    });

    // Restart Button Logic
    restartBtn.addEventListener('click', () => {
        singlePlayerMode.style.display = 'none';
        player1Input.style.display = 'none';
        player2Input.style.display = 'none';
        resultDisplay.textContent = '';
        restartBtn.style.display = 'none';
        singlePlayerBtn.disabled = false;
        twoPlayerBtn.disabled = false;
        document.getElementById('user-name').value = '';
        document.getElementById('user-number').value = '';
        document.getElementById('player1-name').value = '';
        document.getElementById('player1-number').value = '';
        document.getElementById('player2-name').value = '';
        document.getElementById('player2-number').value = '';
    });
});
