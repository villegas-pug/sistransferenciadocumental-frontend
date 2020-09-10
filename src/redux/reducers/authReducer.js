import Usuario from 'models/Usuario'
import {
   AUTH_LOADING,
   AUTH_EXITO,
   AUTH_ERROR,
   AUTH_LOGOUT
} from 'redux/actions/authAction'

const initialState = {
   loading: false,
   data: JSON.parse(localStorage.getItem('user')) || new Usuario(),
   error: null
}

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case AUTH_LOADING:
         return { ...state, loading: true, error: null }
         break
      case AUTH_EXITO:
         return { ...state, loading: false, data: payload }
         break
      case AUTH_ERROR:
         return { ...state, loading: false, error: payload }
         break
      case AUTH_LOGOUT:
         return { ...state, data: new Usuario() }
         break
      default:
         return state
   }
}