// Aplicación principal
let loginController;
let welcomeController;
let gameController;
let resultController;

// Variables globales
window.selectedDifficulty = 1000;
window.gameResults = null;

// Función para navegar entre pantallas
window.navigateTo = function(screenId) {
    // Oculta todas las pantallas
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    // Muestra la pantalla solicitada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Ejecuta lógica específica según la pantalla
        handleScreenChange(screenId);
    }
};

// Maneja los cambios de pantalla
function handleScreenChange(screenId) {
    switch(screenId) {
        case 'welcome-screen':
            // No necesita inicialización adicional
            break;
            
        case 'game-screen':
            // Reinicia el controlador del juego
            gameController.reset();
            gameController.startGame(window.selectedDifficulty);
            break;
            
        case 'result-screen':
            // Muestra los resultados
            if (window.gameResults) {
                resultController.displayResults(window.gameResults);
            }
            break;
            
        case 'login-screen':
            // Limpia el formulario de login
            document.getElementById('login-form').reset();
            break;
    }
}

// Inicializa la aplicación
function initApp() {
    // Carga los usuarios en el localStorage
    StorageManager.loadUsers();
    
    // Inicializa los controladores
    loginController = new LoginController();
    welcomeController = new WelcomeController();
    gameController = new GameController();
    resultController = new ResultController();
    
    console.log('🎯 La Caza del Emoji inicializada correctamente');
}

// Ejecuta la inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);
