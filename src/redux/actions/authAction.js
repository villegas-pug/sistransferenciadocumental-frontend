export const AUTH_LOADING = 'AUTH_LOADING'
export const AUTH_EXITO = 'AUTH_EXITO'
export const AUTH_ERROR = 'AUTH_ERROR'

const authCargando = () => ({ type: AUTH_LOADING })
const authExito = (payload) => ({ type: AUTH_EXITO, payload })
const authError = (payload) => ({ type: AUTH_ERROR, payload })