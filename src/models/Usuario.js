export default class Usuario {

   constructor(login = '', password = '', nombre = '', dni = '', activo = false) {
      this.login = login
      this.password = password
      this.nombre = nombre
      this.dni = dni
      this.activo = activo
   }
}