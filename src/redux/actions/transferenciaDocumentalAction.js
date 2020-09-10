import { api } from 'config/axios'
import { SUCCESS, WARNING, ERROR } from 'constants/levelLog'
import Noty from 'helpers/noty'
import { listarCaja } from 'redux/actions/cajaAction'

export const LISTAR_TRANSFERENCIA_CARGANDO = 'LISTAR_TRANSFERENCIA_CARGANDO'
export const LISTAR_TRANSFERENCIA_EXITO = 'LISTAR_TRANSFERENCIA_EXITO'
export const LISTAR_TRANSFERENCIA_ERROR = 'LISTAR_TRANSFERENCIA_ERROR'
export const GENERAR_TRANSFERENCIA_CARGANDO = 'GENERAR_TRANSFERENCIA_CARGANDO'
export const GENERAR_TRANSFERENCIA_EXITO = 'GENERAR_TRANSFERENCIA_EXITO'
export const GENERAR_TRANSFERENCIA_ERROR = 'GENERAR_TRANSFERENCIA_ERROR'
export const ACTUALIZAR_TRANSFERENCIA_CARGANDO = 'ACTUALIZAR_TRANSFERENCIA_CARGANDO'
export const ACTUALIZAR_TRANSFERENCIA_EXITO = 'ACTUALIZAR_TRANSFERENCIA_EXITO'
export const ACTUALIZAR_TRANSFERENCIA_ERROR = 'ACTUALIZAR_TRANSFERENCIA_ERROR'
export const ELIMINAR_CAJAS_TRANSFERENCIA_CARGANDO = 'ELIMINAR_CAJAS_TRANSFERENCIA_CARGANDO'
export const ELIMINAR_CAJAS_TRANSFERENCIA_EXITO = 'ELIMINAR_CAJAS_TRANSFERENCIA_EXITO'
export const ELIMINAR_CAJAS_TRANSFERENCIA_ERROR = 'ELIMINAR_CAJAS_TRANSFERENCIA_ERROR'

const listarTransferenciaCargando = () => ({ type: LISTAR_TRANSFERENCIA_CARGANDO })
const listarTransferenciaExito = (payload) => ({ type: LISTAR_TRANSFERENCIA_EXITO, payload })
const listarTransferenciaError = (payload) => ({ type: LISTAR_TRANSFERENCIA_ERROR, payload })
const generarTransferenciaCargando = () => ({ type: GENERAR_TRANSFERENCIA_CARGANDO })
const generarTransferenciaExito = () => ({ type: GENERAR_TRANSFERENCIA_EXITO })
const generarTransferenciaError = (payload) => ({ type: GENERAR_TRANSFERENCIA_ERROR, payload })
const actualizarTransferenciaCargando = () => ({ type: ACTUALIZAR_TRANSFERENCIA_CARGANDO })
const actualizarTransferenciaExito = () => ({ type: ACTUALIZAR_TRANSFERENCIA_EXITO })
const actualizarTransferenciaError = (payload) => ({ type: ACTUALIZAR_TRANSFERENCIA_ERROR, payload })
const eliminarCajasTransferenciaCargando = () => ({ type: ELIMINAR_CAJAS_TRANSFERENCIA_CARGANDO })
const eliminarCajasTransferenciaExito = (payload) => ({ type: ELIMINAR_CAJAS_TRANSFERENCIA_EXITO, payload })
const eliminarCajasTransferenciaError = (payload) => ({ type: ELIMINAR_CAJAS_TRANSFERENCIA_ERROR, payload })

export const listarTransferencia = () => async (dispatch) => {
   dispatch(listarTransferenciaCargando())
   const { data: { levelLog, data, message } } = await api('/transferencia-documental/listar')
   switch (levelLog) {
      case SUCCESS:
         dispatch(listarTransferenciaExito(data))
         break
      case WARNING:
         /* Noty(WARNING, message) */
         dispatch(listarTransferenciaError(message))
         break
      case ERROR:
         dispatch(listarTransferenciaError(message))
         Noty(ERROR, message)
         break
   }
}

export const generarTransferencia = (payload) => async (dispatch) => {
   dispatch(generarTransferenciaCargando())
   const { data: { levelLog, data, message } } = await api({
      url: '/transferencia-documental/transferir-cajas',
      method: 'POST',
      data: payload
   })
   switch (levelLog) {
      case SUCCESS:
         dispatch(generarTransferenciaExito(data))
         dispatch(listarCaja())/*-> Actualiza el store caja... */
         Noty(SUCCESS, message)
         break;
      case WARNING:
         Noty(WARNING, message)
         dispatch(generarTransferenciaError(message))
         break
      case ERROR:
         dispatch(generarTransferenciaError(message))
         Noty(ERROR, message)
         break
   }
}

export const actualizarTransferencia = (payload) => async (dispatch) => {
   dispatch(actualizarTransferenciaCargando())
   const { data: { levelLog, data, message } } = await api({
      method: 'PUT',
      url: '/transferencia-documental/actualizar',
      data: payload
   })
   switch (levelLog) {
      case SUCCESS:
         dispatch(actualizarTransferenciaExito(data))
         dispatch(listarCaja())
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(actualizarTransferenciaError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(actualizarTransferenciaError(message))
         Noty(ERROR, message)
         break
   }
}

export const eliminarCajasTransferencia = (payload) => async (dispatch) => {
   dispatch(eliminarCajasTransferenciaCargando())
   const { data: { levelLog, data, message } } = await api({
      method: 'DELETE',
      url: '/transferencia-documental/eliminar-cajas',
      data: payload
   })
   switch (levelLog) {
      case SUCCESS:
         dispatch(eliminarCajasTransferenciaExito(data))
         dispatch(listarCaja())
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(WARNING, message)
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(eliminarCajasTransferenciaError(message))
         Noty(ERROR, message)
         break
   }
}