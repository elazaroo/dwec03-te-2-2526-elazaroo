// Controlador: Login
class LoginController {
    constructor() {
        this.form = document.getElementById('login-form');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.errorMessage = document.getElementById('login-error');
        
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const username = this.usernameInput.value.trim();
        const password = this.passwordInput.value.trim();

        // Validación: campos vacíos
        if (!username || !password) {
            this.showError('Por favor, completa todos los campos.');
            return;
        }

        // Validación: formato de contraseña (alfanumérico)
        const passwordPattern = /^[a-zA-Z0-9]+$/;
        if (!passwordPattern.test(password)) {
            this.showError('La contraseña solo puede contener letras y números.');
            return;
        }

        // Validación contra usuarios en localStorage
        const user = StorageManager.validateUser(username, password);
        
        if (user) {
            // Login exitoso
            const userObject = new User(user.id, user.nombre, user.apellido, user.usuario);
            StorageManager.setCurrentUser(userObject);
            this.hideError();
            this.clearForm();
            window.navigateTo('welcome-screen');
        } else {
            this.showError('Usuario o contraseña incorrectos.');
        }
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.add('show');
    }

    hideError() {
        this.errorMessage.classList.remove('show');
    }

    clearForm() {
        this.form.reset();
    }
}
