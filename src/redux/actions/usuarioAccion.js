import { api } from 'config/axios'
import {
   SUCCESS,
   WARNING,
   ERROR
} from 'constants/levelLog'
import Noty from 'helpers/noty'

export const OBTENER_USUARIO_CARGANDO = 'OBTENER_USUARIO_CARGANDO'
export const OBTENER_USUARIO_EXITO = 'OBTENER_USUARIO_EXITO'
export const OBTENER_USUARIO_ERROR = 'OBTENER_USUARIO_ERROR'
export const CREAR_USUARIO_CARGANDO = 'CREAR_USUARIO_CARGANDO'
export const CREAR_USUARIO_EXITO = 'CREAR_USUARIO_EXITO'
export const CREAR_USUARIO_ERROR = 'CREAR_USUARIO_ERROR'

const obtenerUsuarioCargando = () => ({ type: OBTENER_USUARIO_CARGANDO })
const obtenerUsuarioExito = (payload) => ({ type: OBTENER_USUARIO_EXITO, payload })
const obtenerUsuarioError = (payload) => ({ type: OBTENER_USUARIO_ERROR, payload })
const crearUsuarioCargando = () => ({ type: CREAR_USUARIO_CARGANDO })
const crearUsuarioExito = () => ({ type: CREAR_USUARIO_EXITO })
const crearUsuarioError = (payload) => ({ type: CREAR_USUARIO_ERROR, payload })

export const obtenerUsuario = () => async (dispatch) => {
   dispatch(obtenerUsuarioCargando())
   const { data: { levelLog, data, message } } = await api('/usuario/listar')
   switch (levelLog) {
      case SUCCESS:
         dispatch(obtenerUsuarioExito(data))
         break
      case WARNING:
         dispatch(obtenerUsuarioError(message))
         break
      case ERROR:
         dispatch(obtenerUsuarioError(message))
         break
   }
}

export const crearUsuario = (payload) => async (dispatch) => {
   dispatch(crearUsuarioCargando)
   const { data: { levelLog, data, message } } = await api({
      url: '/usuario/crear',
      method: 'POST',
      data: payload
   })
   switch (levelLog) {
      case SUCCESS:
         Noty(SUCCESS, message)
         dispatch(crearUsuarioExito())
         break
      case WARNING:
         Noty(WARNING, message)
         dispatch(crearUsuarioError(message))
         break
      case ERROR:
         Noty(ERROR, message)
         dispatch(crearUsuarioError(message))
         break
   }
}