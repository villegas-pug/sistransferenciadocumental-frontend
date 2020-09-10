export const UPDATE_LEFT_LIST_TRANSFERENCIA = 'UPDATE_LEFT_LIST_TRANSFERENCIA'
export const UPDATE_RIGTH_LIST_TRANSFERENCIA = 'UPDATE_RIGTH_LIST_TRANSFERENCIA'

export const LOAD_LEFT_LIST_TRANSFERENCIA = 'LOAD_LEFT_LIST_TRANSFERENCIA'
export const LOAD_RIGTH_LIST_TRANSFERENCIA = 'LOAD_RIGTH_LIST_TRANSFERENCIA'
export const LOAD_RIGTH_LIST_TO_EDIT_TRANSFERENCIA = 'LOAD_RIGTH_LIST_TO_EDIT_TRANSFERENCIA'

export const updateLeftListTransferencia = (payload) => ({ type: UPDATE_LEFT_LIST_TRANSFERENCIA, payload })
export const updateRigthListTransferencia = (payload) => ({ type: UPDATE_RIGTH_LIST_TRANSFERENCIA, payload })
export const loadLeftListTransferencia = (payload) => ({ type: LOAD_LEFT_LIST_TRANSFERENCIA, payload })
export const loadRigthListTransferencia = (payload) => ({ type: LOAD_RIGTH_LIST_TRANSFERENCIA, payload })
export const loadRigthListToEditTransferencia = (payload) => ({ type: LOAD_RIGTH_LIST_TO_EDIT_TRANSFERENCIA, payload })