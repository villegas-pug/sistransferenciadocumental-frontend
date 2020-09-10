import {
   OBTENER_USUARIO_CARGANDO,
   OBTENER_USUARIO_EXITO,
   OBTENER_USUARIO_ERROR,
   CREAR_USUARIO_CARGANDO,
   CREAR_USUARIO_EXITO,
   CREAR_USUARIO_ERROR,
} from '../actions/usuarioAccion'

const initialState = {
   data: [],
   loading: false,
   error: null
}

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case OBTENER_USUARIO_CARGANDO:
         return { ...state, data: [], loading: true, error: null }
         break
      case OBTENER_USUARIO_EXITO:
         return { ...state, loading: false, data: payload }
         break
      case OBTENER_USUARIO_ERROR:
         return { ...state, loading: false, error: payload }
      case CREAR_USUARIO_CARGANDO:
         return { loading: true, data: [], error: null }
         break
      case CREAR_USUARIO_EXITO:
         return { loading: false, data: [], error: null }
         break
      case CREAR_USUARIO_ERROR:
         return { loading: false, data: [], error: payload }
         break
      default:
         return state
   }
}