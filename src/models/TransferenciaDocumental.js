export default class TransferenciaDocumental {
   constructor(cajas, encargadoTransferencia = null, idTransferencia = '', idEstadoTransferencia = 1) {
      this.idTransferencia = idTransferencia
      this.cajas = cajas.map(idCaja => ({ idCaja }))
      this.encargadoTransferencia = encargadoTransferencia
      this.idEstadoTransferencia = idEstadoTransferencia
   }
}
