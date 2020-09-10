import {
   GENERAR_CAJA_CARGANDO,
   GENERAR_CAJA_ERROR,
   GENERAR_CAJA_EXITO,
   ACTUALIZAR_CAJA_ID,
   ACTUALIZAR_CAJA_CARGANDO,
   ACTUALIZAR_CAJA_EXITO,
   ACTUALIZAR_CAJA_ERROR,
   LISTAR_CAJA_CARGANDO,
   LISTAR_CAJA_EXITO,
   LISTAR_CAJA_ERROR,
   CLEAN_DATA_CAJA,
   CLEAN_NEW_ID_CAJA
} from "../actions/cajaAction";

const initialState = {
   newIdCaja: '',
   data: [],
   loading: false,
   error: null
}

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case GENERAR_CAJA_CARGANDO:
         return { ...state, loading: true, error: null }
         break;
      case GENERAR_CAJA_EXITO:
         return { ...state, loading: false, ...payload }
      case GENERAR_CAJA_ERROR:
         return { ...state, loading: false, error: payload }
      case ACTUALIZAR_CAJA_ID:
         return { ...state, newIdCaja: payload }
      case ACTUALIZAR_CAJA_CARGANDO:
         return { ...state, loading: true }
         break
      case ACTUALIZAR_CAJA_EXITO:
         return { ...state, loading: false, ...payload }
         break
      case ACTUALIZAR_CAJA_ERROR:
         return { ...state, loading: false, error: payload }
         break
      case LISTAR_CAJA_CARGANDO:
         return { ...state, loading: true }
         break
      case LISTAR_CAJA_EXITO:
         return { ...state, loading: false, ...payload }
         break
      case LISTAR_CAJA_ERROR:
         return { ...state, loading: false, error: payload }
         break
      case CLEAN_DATA_CAJA:
         return { ...state, data: [] }
         break
      case CLEAN_NEW_ID_CAJA:
         return { ...state, newIdCaja: '' }
         break
      default:
         return state;
   }
}