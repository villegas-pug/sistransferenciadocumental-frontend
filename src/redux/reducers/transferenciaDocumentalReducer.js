import {
   LISTAR_TRANSFERENCIA_CARGANDO,
   LISTAR_TRANSFERENCIA_EXITO,
   LISTAR_TRANSFERENCIA_ERROR,
   GENERAR_TRANSFERENCIA_CARGANDO,
   GENERAR_TRANSFERENCIA_EXITO,
   GENERAR_TRANSFERENCIA_ERROR,
   ACTUALIZAR_TRANSFERENCIA_CARGANDO,
   ACTUALIZAR_TRANSFERENCIA_EXITO,
   ACTUALIZAR_TRANSFERENCIA_ERROR,
   ELIMINAR_CAJAS_TRANSFERENCIA_CARGANDO,
   ELIMINAR_CAJAS_TRANSFERENCIA_EXITO,
   ELIMINAR_CAJAS_TRANSFERENCIA_ERROR
} from 'redux/actions/transferenciaDocumentalAction'

const initialState = {
   loading: false,
   data: [],
   error: null
}

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case LISTAR_TRANSFERENCIA_CARGANDO:
         return { loading: true, data: [], error: null }
         break
      case LISTAR_TRANSFERENCIA_EXITO:
         return { loading: false, data: payload, error: null }
         break
      case LISTAR_TRANSFERENCIA_ERROR:
         return { loading: false, data: [], error: payload }
         break
      case GENERAR_TRANSFERENCIA_CARGANDO:
         return { loading: true, data: [], error: null }
         break
      case GENERAR_TRANSFERENCIA_EXITO:
         return { data: payload, loading: false, error: false }
         break
      case GENERAR_TRANSFERENCIA_ERROR:
         return { loading: false, data: [], error: payload }
         break
      case ACTUALIZAR_TRANSFERENCIA_CARGANDO:
         return { loading: true, data: [], error: null }
         break
      case ACTUALIZAR_TRANSFERENCIA_EXITO:
         return { loading: false, data: payload, error: null }
         break
      case ACTUALIZAR_TRANSFERENCIA_ERROR:
         return { loading: false, data: [], error: payload }
         break
      case ELIMINAR_CAJAS_TRANSFERENCIA_CARGANDO:
         return { loading: true, data: [], error: null }
         break
      case ELIMINAR_CAJAS_TRANSFERENCIA_EXITO:
         return { loading: false, data: payload, error: null }
         break
      case ELIMINAR_CAJAS_TRANSFERENCIA_ERROR:
         return { loading: false, data: payload, error: null }
         break
      default:
         return state
   }
} 