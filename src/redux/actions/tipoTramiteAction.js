import { api } from 'config/axios'
import {
   SUCCESS,
   WARNING,
   ERROR
} from 'constants/levelLog'
import Noty from 'helpers/noty'

export const OBTENER_TIPOTRAMITE_CARGANDO = 'TIPOTRAMITE_CARGANDO'
export const OBTENER_TIPOTRAMITE_EXITO = 'TIPOTRAMITE_EXITO'
export const OBTENER_TIPOTRAMITE_ERROR = 'TIPOTRAMITE_ERROR'

const obtenerTipoTramiteCargando = () => ({ type: OBTENER_TIPOTRAMITE_CARGANDO })
const obtenerTipoTramiteExito = (payload) => ({ type: OBTENER_TIPOTRAMITE_EXITO, payload })
const obtenerTipoTramiteError = (payload) => ({ type: OBTENER_TIPOTRAMITE_ERROR, payload })

export const obtenerTipoTramite = (payload) => async (dispatch) => {
   dispatch(obtenerTipoTramiteCargando())
   const { data: { levelLog, data, message } } = await api('/tipo-tramite/listar')
   switch (levelLog) {
      case SUCCESS:
         dispatch(obtenerTipoTramiteExito(data))
         break
      case WARNING:
         dispatch(obtenerTipoTramiteError(message))
         break
      case ERROR:
         Noty(ERROR, message)
         dispatch(obtenerTipoTramiteError(message))
         break
   }
}