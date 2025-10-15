// Controlador: Bienvenida
class WelcomeController {
    constructor() {
        this.difficultySelect = document.getElementById('difficulty');
        this.startButton = document.getElementById('start-game-btn');
        
        this.init();
    }

    init() {
        // Evento: change en el selector de nivel
        this.difficultySelect.addEventListener('change', (e) => this.handleDifficultyChange(e));
        
        // Evento: click en el botón de inicio
        this.startButton.addEventListener('click', () => this.startGame());
    }

    handleDifficultyChange(e) {
        const selectedDifficulty = e.target.value;
        console.log(`Nivel seleccionado: ${selectedDifficulty}ms`);
    }

    startGame() {
        const difficulty = parseInt(this.difficultySelect.value);
        
        // Guarda la dificultad seleccionada
        window.selectedDifficulty = difficulty;
        
        // Navega a la pantalla de juego
        window.navigateTo('game-screen');
    }
}
