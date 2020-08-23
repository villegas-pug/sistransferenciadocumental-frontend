import {
   SELECT_ELEMENT_EVALUADOR,
   SELECT_ELEMENT_TIPOTRAMITE,
   CLEAN_SELECTED_EVALUADOR,
   CLEAN_SELECTED_TIPOTRAMITE
} from 'redux/actions/autocompleteAction'

import {
   CLEAN_SELECTED_ELEMENTS
} from 'redux/actions/autocompleteAction'
const initialState = {
   evaluador: { sNombre: '' },
   tipoTramite: { sDescripcion: '' }
}

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case SELECT_ELEMENT_EVALUADOR:
         return { ...state, evaluador: { ...payload } }
         break
      case SELECT_ELEMENT_TIPOTRAMITE:
         return { ...state, tipoTramite: { ...payload } }
         break
      case CLEAN_SELECTED_ELEMENTS:
         return { evaluador: { sNombre: '' }, tipoTramite: { sDescripcion: '' } }
         break
      case CLEAN_SELECTED_EVALUADOR:
         return { ...state, evaluador: { sNombre: '' } }
         break
      case CLEAN_SELECTED_TIPOTRAMITE:
         return { ...state, tipoTramite: { sDescripcion: '' } }
         break
      default:
         return state
         break
   }
}