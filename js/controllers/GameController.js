// Controlador: Juego
class GameController {
    constructor() {
        this.game = null;
        this.gameGrid = document.getElementById('game-grid');
        this.scoreDisplay = document.getElementById('score-value');
        this.timeDisplay = document.getElementById('time-value');
        this.livesDisplay = document.getElementById('lives-display');
        this.endButton = document.getElementById('end-game-btn');
        
        this.emojiInterval = null;
        this.timeInterval = null;
        this.currentEmojiCell = null;
        
        this.targetEmoji = '💰';
        this.neutralEmoji = '⚫';
        
        this.init();
    }

    init() {
        this.endButton.addEventListener('click', () => this.endGame());
    }

    startGame(difficulty = 1000) {
        // Reinicia el juego
        this.game = new Game(difficulty);
        this.game.isGameActive = true;
        
        // Genera el tablero
        this.generateGrid();
        
        // Actualiza la interfaz
        this.updateUI();
        
        // Inicia el temporizador
        this.startTimer();
        
        // Inicia la aparición de emojis
        this.startEmojiAppearance();
    }

    generateGrid() {
        this.gameGrid.innerHTML = '';
        
        // Crea una cuadrícula de 4x4
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.dataset.index = i;
            cell.textContent = this.neutralEmoji;
            
            // Evento: click en la celda
            cell.addEventListener('click', (e) => this.handleCellClick(e));
            
            // Evento: mouseover para feedback visual
            cell.addEventListener('mouseover', (e) => this.handleCellHover(e));
            cell.addEventListener('mouseout', (e) => this.handleCellOut(e));
            
            this.gameGrid.appendChild(cell);
        }
    }

    startTimer() {
        this.timeInterval = setInterval(() => {
            this.game.timeRemaining--;
            this.updateUI();
            
            if (this.game.timeRemaining <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    startEmojiAppearance() {
        // Muestra el emoji inmediatamente
        this.showEmoji();
        
        // Configura el intervalo según la dificultad
        this.emojiInterval = setInterval(() => {
            this.showEmoji();
        }, this.game.difficulty);
    }

    showEmoji() {
        // Oculta el emoji anterior
        if (this.currentEmojiCell) {
            this.currentEmojiCell.textContent = this.neutralEmoji;
        }
        
        // Selecciona una celda aleatoria
        const cells = this.gameGrid.querySelectorAll('.grid-cell');
        const randomIndex = Math.floor(Math.random() * cells.length);
        const randomCell = cells[randomIndex];
        
        // Muestra el emoji objetivo
        randomCell.textContent = this.targetEmoji;
        
        // Guarda la posición actual
        this.game.setTargetPosition(parseInt(randomCell.dataset.index));
        this.currentEmojiCell = randomCell;
    }

    handleCellClick(e) {
        if (!this.game.isGameActive) return;
        
        const clickedCell = e.target;
        const clickedIndex = parseInt(clickedCell.dataset.index);
        
        this.game.incrementTotalClicks();
        
        // Verifica si es la celda correcta
        if (clickedIndex === this.game.targetPosition) {
            // Acierto
            this.game.incrementScore();
            clickedCell.classList.add('correct');
            
            // Verifica si el jugador ha ganado
            if (this.game.hasWon()) {
                setTimeout(() => this.endGame(), 500);
                return;
            }
            
            // Remueve la clase después de la animación
            setTimeout(() => {
                clickedCell.classList.remove('correct');
            }, 300);
        } else {
            // Fallo
            this.game.decrementLives();
            clickedCell.classList.add('wrong');
            
            // Verifica si el jugador ha perdido
            if (this.game.isGameOver()) {
                setTimeout(() => this.endGame(), 500);
                return;
            }
            
            // Remueve la clase después de la animación
            setTimeout(() => {
                clickedCell.classList.remove('wrong');
            }, 300);
        }
        
        this.updateUI();
    }

    handleCellHover(e) {
        const cell = e.target;
        if (this.game.isGameActive) {
            cell.style.borderColor = '#667eea';
        }
    }

    handleCellOut(e) {
        const cell = e.target;
        cell.style.borderColor = '#e2e8f0';
    }

    updateUI() {
        // Actualiza la puntuación
        this.scoreDisplay.textContent = this.game.score;
        
        // Actualiza el tiempo
        this.timeDisplay.textContent = `${this.game.timeRemaining}s`;
        
        // Actualiza las vidas
        const hearts = '❤️ '.repeat(this.game.lives);
        const brokenHearts = '🖤 '.repeat(3 - this.game.lives);
        this.livesDisplay.textContent = hearts + brokenHearts;
    }

    endGame() {
        this.game.isGameActive = false;
        
        // Detiene los intervalos
        clearInterval(this.timeInterval);
        clearInterval(this.emojiInterval);
        
        // Guarda los resultados del juego
        window.gameResults = {
            score: this.game.score,
            difficulty: this.game.getDifficultyName(),
            elapsedTime: this.game.getElapsedTime(),
            precision: this.game.getPrecision(),
            hasWon: this.game.hasWon()
        };
        
        // Navega a la pantalla de resultados
        window.navigateTo('result-screen');
    }

    reset() {
        if (this.timeInterval) clearInterval(this.timeInterval);
        if (this.emojiInterval) clearInterval(this.emojiInterval);
        this.currentEmojiCell = null;
    }
}
