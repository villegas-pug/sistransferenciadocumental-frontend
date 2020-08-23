import {
   AUTH_LOADING,
   AUTH_EXITO,
   AUTH_ERROR
} from 'redux/actions/authAction'

const initialState = {
   user: { sLogin: 'rguevarav', sNombre: 'Cristopher, Guevara Villegas' },
   logged: true,
   error: null
}

export default (state = initialState, { type, payload }) => {
   switch (type) {
      default:
         return state
   }
}