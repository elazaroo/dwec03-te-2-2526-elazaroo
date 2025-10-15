// Controlador: Resultados
class ResultController {
    constructor() {
        this.resultEmoji = document.getElementById('result-emoji');
        this.resultTitle = document.getElementById('result-title');
        this.finalScore = document.getElementById('final-score');
        this.finalDifficulty = document.getElementById('final-difficulty');
        this.finalTime = document.getElementById('final-time');
        this.finalPrecision = document.getElementById('final-precision');
        this.restartButton = document.getElementById('restart-btn');
        this.logoutButton = document.getElementById('logout-btn');
        
        this.init();
    }

    init() {
        this.restartButton.addEventListener('click', () => this.restart());
        this.logoutButton.addEventListener('click', () => this.logout());
    }

    displayResults(results) {
        // Actualiza el título y emoji según el resultado
        if (results.hasWon) {
            this.resultEmoji.textContent = '🏆';
            this.resultEmoji.className = 'emoji-title success';
            this.resultTitle.textContent = '¡Máster Cazador!';
            this.resultTitle.className = 'success';
        } else {
            this.resultEmoji.textContent = '💔';
            this.resultEmoji.className = 'emoji-title danger';
            this.resultTitle.textContent = '¡Casi lo logras!';
            this.resultTitle.className = 'danger';
        }
        
        // Actualiza las estadísticas
        this.finalScore.textContent = results.score;
        this.finalDifficulty.textContent = results.difficulty;
        this.finalTime.textContent = results.elapsedTime;
        this.finalPrecision.textContent = `${results.precision}%`;
    }

    restart() {
        // Reinicia el juego y vuelve a la pantalla de bienvenida
        window.navigateTo('welcome-screen');
    }

    logout() {
        // Cierra sesión y vuelve a la pantalla de login
        StorageManager.clearCurrentUser();
        window.navigateTo('login-screen');
    }
}
