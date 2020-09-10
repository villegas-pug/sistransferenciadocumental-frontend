import { api } from 'config/axios'
import Noty from 'helpers/noty'
import {
   SUCCESS,
   WARNING,
   ERROR
} from 'constants/levelLog'

export const BUSCAR_CONSERVACION_CARGANDO = 'BUSCAR_CONSERVACION_CARGANDO'
export const BUSCAR_CONSERVACION_EXITO = 'BUSCAR_CONSERVACION_EXITO'
export const BUSCAR_CONSERVACION_ERROR = 'BUSCAR_CONSERVACION_ERROR'
export const CLEAN_DATA_CONSERVACION = 'CLEAN_DATA_CONSERVACION'

const buscarConservacionCargando = () => ({ type: BUSCAR_CONSERVACION_CARGANDO })
const buscarConservacionExito = (payload) => ({ type: BUSCAR_CONSERVACION_EXITO, payload })
const buscarConservacionError = (payload) => ({ type: BUSCAR_CONSERVACION_ERROR, payload })

export const cleanDataConservacion = () => ({ type: CLEAN_DATA_CONSERVACION })

export const buscarConservacion = (payload) => async (dispatch) => {
   dispatch(buscarConservacionCargando())
   const { data: { levelLog, data, message } } = await api({
      url: '/fondo-documental/buscar',
      method: 'POST',
      data: payload
   })
   switch (levelLog) {
      case SUCCESS:
         dispatch(buscarConservacionExito(data))
         Noty(SUCCESS, message)
         break
      case WARNING:
         dispatch(buscarConservacionError(message))
         Noty(WARNING, message)
         break
      case ERROR:
         dispatch(buscarConservacionError(message))
         Noty(ERROR, message)
         break
   }
}