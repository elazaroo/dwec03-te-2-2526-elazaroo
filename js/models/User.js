// Modelo: Usuario
class User {
    constructor(id, nombre, apellido, usuario) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.usuario = usuario;
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
}
