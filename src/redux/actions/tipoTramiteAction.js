import { api } from 'config/axios'
export const OBTENER_TIPOTRAMITE_CARGANDO = 'TIPOTRAMITE_CARGANDO'
export const OBTENER_TIPOTRAMITE_EXITO = 'TIPOTRAMITE_EXITO'
export const OBTENER_TIPOTRAMITE_ERROR = 'TIPOTRAMITE_ERROR'

const obtenerTipoTramiteCargando = () => ({ type: OBTENER_TIPOTRAMITE_CARGANDO })
const obtenerTipoTramiteExito = (payload) => ({ type: OBTENER_TIPOTRAMITE_EXITO, payload })
const obtenerTipoTramiteError = (payload) => ({ type: OBTENER_TIPOTRAMITE_ERROR, payload })

export const obtenerTipoTramite = (payload) => async (dispatch) => {
   try {
      dispatch(obtenerTipoTramiteCargando())
      const data = await api('/tipo-tramite/listar')
      dispatch(obtenerTipoTramiteExito(data))
   } catch (err) {
      dispatch(obtenerTipoTramiteError(err))
   }
}