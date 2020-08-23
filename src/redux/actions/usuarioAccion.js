import { api } from '../../config/axios'
export const OBTENER_USUARIO_CARGANDO = 'OBTENER_USUARIO_CARGANDO'
export const OBTENER_USUARIO_EXITO = 'OBTENER_USUARIO_EXITO'
export const OBTENER_USUARIO_ERROR = 'OBTENER_USUARIO_ERROR'

const obtenerUsuarioCargando = () => ({ type: OBTENER_USUARIO_CARGANDO })
const obtenerUsuarioExito = (payload) => ({ type: OBTENER_USUARIO_EXITO, payload })
const obtenerUsuarioError = (payload) => ({ type: OBTENER_USUARIO_ERROR, payload })

export const obtenerUsuario = () => async (dispatch) => {
   try {
      dispatch(obtenerUsuarioCargando())
      const usuarios = await api('/usuario/listar')
      dispatch(obtenerUsuarioExito(usuarios.data))
   } catch (err) {
      dispatch(obtenerUsuarioError(err))
   }
}
