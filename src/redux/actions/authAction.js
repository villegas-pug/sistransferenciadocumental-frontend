import { api } from 'config/axios'
import Noty from 'helpers/noty'
import {
   SUCCESS,
   WARNING,
   ERROR
} from 'constants/levelLog'

export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_EXITO = 'AUTH_EXITO'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

const authCargando = () => ({ type: AUTH_LOADING })
const authExito = (payload) => ({ type: AUTH_EXITO, payload })
const authError = (payload) => ({ type: AUTH_ERROR, payload })
export const authLogout = () => ({ type: AUTH_LOGOUT })

export const auth = (payload) => async (dispatch) => {
   dispatch(authCargando())
   const { data: { levelLog, message, data } } = await api({
      method: 'POST',
      url: '/usuario/auth',
      data: payload
   })
   switch (levelLog) {
      case SUCCESS:
         dispatch(authExito(data[0]))
         Noty(SUCCESS, message)
         break
      case WARNING:
         Noty(WARNING, message)
         break
      case ERROR:
         Noty(ERROR, message)
         dispatch(authError(message))
         break
   }
}
