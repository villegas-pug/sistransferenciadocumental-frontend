export default class Caja {
   constructor(operador, tipoTramite, idCaja = '') {
      this.idCaja = idCaja
      this.operador = operador
      this.tipoTramite = tipoTramite
      this.fondoDocumental = []
   }
}
