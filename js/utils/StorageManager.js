// Utilidad: Gestor de almacenamiento local
const StorageManager = {
    usuariosPredefinidos: [
        {
            "id": 1,
            "nombre": "Iker",
            "apellido": "Arana",
            "usuario": "iarana",
            "contraseña": "1234Abcd"
        },
        {
            "id": 2,
            "nombre": "Ander",
            "apellido": "Goikoetxea",
            "usuario": "agoikoetxea",
            "contraseña": "5678Efgh"
        },
        {
            "id": 3,
            "nombre": "Jokin",
            "apellido": "Olano",
            "usuario": "jolano",
            "contraseña": "9012Ijkl"
        }
    ],

    // Carga los usuarios al localStorage
    loadUsers: function() {
        // Si no existen usuarios en localStorage, los carga
        if (!localStorage.getItem('usuarios')) {
            localStorage.setItem('usuarios', JSON.stringify(this.usuariosPredefinidos));
        }
        return true;
    },

    // Obtiene todos los usuarios del localStorage
    getUsers: function() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    },

    // Valida las credenciales del usuario
    validateUser: function(username, password) {
        const usuarios = this.getUsers();
        return usuarios.find(u => u.usuario === username && u.contraseña === password);
    },

    // Guarda el usuario actual
    setCurrentUser: function(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },

    // Obtiene el usuario actual
    getCurrentUser: function() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },

    // Elimina el usuario actual
    clearCurrentUser: function() {
        localStorage.removeItem('currentUser');
    }
};
