import {
   BUSCAR_CONSERVACION_CARGANDO,
   BUSCAR_CONSERVACION_EXITO,
   BUSCAR_CONSERVACION_ERROR,
   CLEAN_DATA_CONSERVACION
} from 'redux/actions/conservacionDocumentalAccion'

const initialState = {
   loading: false,
   data: [],
   error: null
}

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case BUSCAR_CONSERVACION_CARGANDO:
         return { loading: true, data: [], error: null }
         break
      case BUSCAR_CONSERVACION_EXITO:
         return { loading: false, data: payload, error: null }
         break
      case BUSCAR_CONSERVACION_ERROR:
         return { loading: false, data: [], error: payload }
         break
      case CLEAN_DATA_CONSERVACION:
         return { ...state, data: [] }
         break
      default:
         return state
   }
}