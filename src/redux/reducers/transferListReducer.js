import {
   UPDATE_LEFT_LIST_TRANSFERENCIA,
   UPDATE_RIGTH_LIST_TRANSFERENCIA,
   LOAD_LEFT_LIST_TRANSFERENCIA,
   LOAD_RIGTH_LIST_TRANSFERENCIA,
   LOAD_RIGTH_LIST_TO_EDIT_TRANSFERENCIA
} from 'redux/actions/transferListAction'

const initialState = {
   transferenciaDocumental: {
      estado: '',/*-> Pendiente | Transferido */
      leftData: [],
      rightData: [],
      idTransferenciaToEdit: null
   },
}

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case UPDATE_LEFT_LIST_TRANSFERENCIA:
         return { transferenciaDocumental: { ...state.transferenciaDocumental, leftData: payload } }
         break
      case UPDATE_RIGTH_LIST_TRANSFERENCIA:
         return { transferenciaDocumental: { ...state.transferenciaDocumental, rightData: payload } }
         break
      case LOAD_LEFT_LIST_TRANSFERENCIA:
         return {
            transferenciaDocumental: {
               ...state.transferenciaDocumental,
               estado: 'Pendiente',
               leftData: typeof (payload) !== 'undefined' ? payload.filter(row => row.transferencia === null).map(row => row.idCaja) : [],
               rightData: []
            }
         }
         break
      case LOAD_RIGTH_LIST_TRANSFERENCIA:
         return {
            transferenciaDocumental: {
               ...state.transferenciaDocumental,
               estado: 'Transferido',
               leftData: [],
               rightData: typeof payload !== 'undefined' ? payload.filter(row => row.transferencia !== null).map(row => row.idCaja) : [],
            }
         }
         break
      case LOAD_RIGTH_LIST_TO_EDIT_TRANSFERENCIA:
         const { transferencia, cajas: cajaDb } = payload
         return {
            transferenciaDocumental: {
               estado: 'Parcial',
               leftData: cajaDb && cajaDb.filter(caja => caja.transferencia === null).map(caja => caja.idCaja),
               rightData: transferencia.cajas && transferencia.cajas.map(caja => caja.idCaja),
               idTransferenciaToEdit: transferencia.idTransferencia
            },
         }
         break
      default:
         return state
   }
}