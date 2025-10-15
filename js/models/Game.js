// Modelo: Juego
class Game {
    constructor(difficulty = 1000) {
        this.score = 0;
        this.lives = 3;
        this.difficulty = difficulty;
        this.targetPosition = null;
        this.totalTime = 30;
        this.timeRemaining = 30;
        this.totalClicks = 0;
        this.correctClicks = 0;
        this.isGameActive = false;
        this.startTime = null;
    }

    // Incrementa la puntuación
    incrementScore() {
        this.score++;
        this.correctClicks++;
    }

    // Decrementa las vidas
    decrementLives() {
        if (this.lives > 0) {
            this.lives--;
        }
    }

    // Incrementa el total de clicks
    incrementTotalClicks() {
        this.totalClicks++;
    }

    // Establece la posición del emoji objetivo
    setTargetPosition(position) {
        this.targetPosition = position;
    }

    // Verifica si el juego ha terminado
    isGameOver() {
        return this.lives === 0 || this.timeRemaining <= 0;
    }

    // Verifica si el jugador ha ganado
    hasWon() {
        return this.score >= 10 && this.lives > 0;
    }

    // Obtiene el nombre del nivel de dificultad
    getDifficultyName() {
        switch(this.difficulty) {
            case 1500: return 'Principiante';
            case 1000: return 'Intermedio';
            case 500: return 'Avanzado';
            default: return 'Intermedio';
        }
    }

    // Calcula la precisión
    getPrecision() {
        if (this.totalClicks === 0) return 0;
        return Math.round((this.correctClicks / this.totalClicks) * 100);
    }

    // Obtiene el tiempo transcurrido
    getElapsedTime() {
        return this.totalTime - this.timeRemaining;
    }

    // Reinicia el juego
    reset(difficulty = 1000) {
        this.score = 0;
        this.lives = 3;
        this.difficulty = difficulty;
        this.targetPosition = null;
        this.timeRemaining = 30;
        this.totalClicks = 0;
        this.correctClicks = 0;
        this.isGameActive = false;
        this.startTime = null;
    }
}
