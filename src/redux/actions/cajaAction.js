import { api } from 'config/axios'
import Noty from 'helpers/noty'
import { cleanSelectedElements } from 'redux/actions/autocompleteAction'

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

const generarCajaCargando = () => ({ type: GENERAR_CAJA_CARGANDO })
const generarCajaExito = (payload) => ({ type: GENERAR_CAJA_EXITO, payload })
const generarCajaError = (payload) => ({ type: GENERAR_CAJA_ERROR, payload })
const actualizarCajaCargando = () => ({ type: ACTUALIZAR_CAJA_CARGANDO })
const actualizarCajaExito = (payload) => ({ type: ACTUALIZAR_CAJA_EXITO, payload })
const actualizarCajaError = (payload) => ({ type: ACTUALIZAR_CAJA_ERROR, payload })
const listarCajaCargando = () => ({ type: LISTAR_CAJA_CARGANDO })
const listarCajaExito = (payload) => ({ type: LISTAR_CAJA_EXITO, payload })
const listarCajaError = (payload) => ({ type: LISTAR_CAJA_ERROR, payload })

export const actualizarCajaId = (payload) => ({ type: ACTUALIZAR_CAJA_ID, payload })

export const generarCajaId = () => async (dispatch) => {
   try {
      dispatch(generarCajaCargando())
      const res = await api('/caja/generarId')
      dispatch(generarCajaExito({ newIdCaja: res.data.id }))
      Noty('success', '¡Número de caja, generada con exito!')
   } catch (err) {
      Noty('error', '¡Ocurrió un error, intentelo nuevamente!')
      dispatch(generarCajaError(err))
   }
}

export const generarCaja = (payload) => async (dispatch) => {
   try {
      dispatch(generarCajaCargando())
      const res = await api({
         method: 'POST',
         url: '/caja/generar',
         data: payload
      })
      dispatch(generarCajaExito({ data: res.data, newIdCaja: '' }))
      dispatch(cleanSelectedElements())
      Noty('success', '¡Caja creada con exito!')
   } catch (err) {
      Noty('error', '¡Ocurrió un error, intentelo nuevamente!')
      dispatch(generarCajaError(err))
   }
}

export const actualizarCaja = (payload) => async (dispatch) => {
   try {
      dispatch(actualizarCajaCargando())
      const response = await api({ url: '/caja/actualizar', method: 'PUT', data: payload })
      dispatch(actualizarCajaExito({ data: response.data, newIdCaja: '' }))
      dispatch(cleanSelectedElements())
      Noty('success', '¡Caja actualizada con exito!')
   } catch (err) {
      dispatch(actualizarCajaError(err))
      Noty('error', '¡Ocurrió un error, intentelo nuevamente!')
   }
}

export const listarCaja = () => async (dispatch) => {
   try {
      dispatch(listarCajaCargando())
      const response = await api('/caja/listar')
      dispatch(listarCajaExito({ data: response.data, newIdCaja: '' }))
      dispatch(cleanSelectedElements())
      Noty('success', '¡Cajas listadas exitosamenta!')
   } catch (err) {
      dispatch(listarCajaError(err))
      Noty('error', '¡Ocurrió un error, intentelo nuevamente!')
   }
}