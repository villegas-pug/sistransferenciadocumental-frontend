import {
   OBTENER_TIPOTRAMITE_CARGANDO,
   OBTENER_TIPOTRAMITE_EXITO,
   OBTENER_TIPOTRAMITE_ERROR
} from 'redux/actions/tipoTramiteAction'

const initialState = {
   data: [],
   loading: false,
   error: null
}

export default function (state = initialState, { type, payload }) {
   switch (type) {
      case OBTENER_TIPOTRAMITE_CARGANDO:
         return { loading: true, data: [], error: null }
         break
      case OBTENER_TIPOTRAMITE_EXITO:
         return { loading: false, data: payload, error: null }
         break
      case OBTENER_TIPOTRAMITE_ERROR:
         return { loading: false, data: [], error: payload }
         break
      default:
         return state
         break
   }
}