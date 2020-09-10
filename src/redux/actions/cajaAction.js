import { api } from 'config/axios'
import Noty from 'helpers/noty'
import { SUCCESS, WARNING, ERROR } from 'constants/levelLog'
import { cleanSelectedElements, cleanSelectedEvaluador } from 'redux/actions/autocompleteAction'

export const GENERAR_CAJA_CARGANDO = 'GENERAR_CAJA_CARGANDO'
export const GENERAR_CAJA_EXITO = 'GENERAR_CAJA_EXITO'
export const GENERAR_CAJA_ERROR = 'GENERAR_CAJA_ERROR'
export const GENERAR_CAJA_ID = 'GENERAR_CAJA_ID'
export const GENERAR_CAJA = 'GENERAR_CAJA'
export const ACTUALIZAR_CAJA_ID = 'ACTUALIZAR_CAJA_ID'
export const ACTUALIZAR_CAJA_CARGANDO = 'ACTUALIZAR_CAJA_CARGANDO'
export const ACTUALIZAR_CAJA_EXITO = 'ACTUALIZAR_CAJA_EXITO'
export const ACTUALIZAR_CAJA_ERROR = 'ACTUALIZAR_CAJA_ERROR'
export const LISTAR_CAJA_CARGANDO = 'LISTAR_CAJA_CARGANDO'
export const LISTAR_CAJA_EXITO = 'LISTAR_CAJA_EXITO'
export const LISTAR_CAJA_ERROR = 'LISTAR_CAJA_ERROR'
export const CLEAN_DATA_CAJA = 'CLEAN_DATA_CAJA'
export const CLEAN_NEW_ID_CAJA = 'CLEAN_NEW_ID_CAJA'

const generarCajaCargando = () => ({ type: GENERAR_CAJA_CARGANDO })
const generarCajaExito = (payload) => ({ type: GENERAR_CAJA_EXITO, payload })
const generarCajaError = (payload) => ({ type: GENERAR_CAJA_ERROR, payload })
const actualizarCajaCargando = () => ({ type: ACTUALIZAR_CAJA_CARGANDO })
const actualizarCajaExito = (payload) => ({ type: ACTUALIZAR_CAJA_EXITO, payload })
const actualizarCajaError = (payload) => ({ type: ACTUALIZAR_CAJA_ERROR, payload })
const listarCajaCargando = () => ({ type: LISTAR_CAJA_CARGANDO })
const listarCajaError = (payload) => ({ type: LISTAR_CAJA_ERROR, payload })
export const cleanDataCaja = () => ({ type: CLEAN_DATA_CAJA })
export const cleanNewIdCaja = () => ({ type: CLEAN_NEW_ID_CAJA })
export const listarCajaExito = (payload) => ({ type: LISTAR_CAJA_EXITO, payload })

export const actualizarCajaId = (payload) => ({ type: ACTUALIZAR_CAJA_ID, payload })

export const generarCajaId = () => async (dispatch) => {
   dispatch(generarCajaCargando())
   const { data: { levelLog, message, data } } = await api('/caja/generarId')
   switch (levelLog) {
      case SUCCESS:
         dispatch(generarCajaExito({ newIdCaja: data }))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(generarCajaError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(generarCajaError(message))
         Noty(ERROR, message)
         break
   }
}

export const generarCaja = (payload) => async (dispatch) => {
   dispatch(generarCajaCargando())
   const { data: { levelLog, message, data } } = await api({
      method: 'POST',
      url: '/caja/generar',
      data: payload
   })
   switch (levelLog) {
      case SUCCESS:
         dispatch(generarCajaExito({ data, newIdCaja: '' }))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(generarCajaError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(generarCajaError(message))
         Noty(ERROR, message)
         break
   }
}

export const actualizarCaja = (payload) => async (dispatch) => {
   dispatch(actualizarCajaCargando())
   const {
      data: { levelLog, message, data }
   } = await api({ url: '/caja/actualizar', method: 'PUT', data: payload })
   switch (levelLog) {
      case SUCCESS:
         dispatch(actualizarCajaExito({ data, newIdCaja: '' }))
         dispatch(cleanSelectedElements())
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(actualizarCajaError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(actualizarCajaError(message))
         Noty(ERROR, message)
         break
   }
}

export const listarCaja = () => async (dispatch) => {
   dispatch(listarCajaCargando())
   const { data: { levelLog, message, data } } = await api('/caja/listar')
   switch (levelLog) {
      case SUCCESS:
         dispatch(listarCajaExito({ data, newIdCaja: '' }))
         dispatch(cleanSelectedElements())
         break
      case WARNING:
         dispatch(listarCajaError(message))
         break
      case ERROR:
         dispatch(listarCajaError(message))
         Noty(ERROR, message)
         break
   }
}