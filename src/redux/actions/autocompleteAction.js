export const SELECT_ELEMENT_EVALUADOR = 'SELECT_ELEMENT_EVALUADOR'
export const SELECT_ELEMENT_TIPOTRAMITE = 'SELECT_ELEMENT_TIPOTRAMITE'

export const CLEAN_SELECTED_ELEMENTS = 'CLEAN_SELECTED_ELEMENTS'
export const CLEAN_SELECTED_EVALUADOR = 'CLEAN_SELECTED_EVALUADOR'
export const CLEAN_SELECTED_TIPOTRAMITE = 'CLEAN_SELECTED_TIPOTRAMITE'

export const selectedElementEvaluador = (payload) => ({ type: SELECT_ELEMENT_EVALUADOR, payload })
export const selectedElementTipoTramite = (payload) => ({ type: SELECT_ELEMENT_TIPOTRAMITE, payload })
export const cleanSelectedElements = () => ({ type: CLEAN_SELECTED_ELEMENTS })
export const cleanSelectedEvaluador = () => ({ type: CLEAN_SELECTED_EVALUADOR })
export const cleanSelectedTipoTramite = () => ({ type: CLEAN_SELECTED_TIPOTRAMITE })