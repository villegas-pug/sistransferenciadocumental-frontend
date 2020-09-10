import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { devToolsEnhancer } from 'redux-devtools-extension'
import drawer from 'redux/reducers/drawerReducer'
import caja from 'redux/reducers/cajaReducer'
import autoComplete from 'redux/reducers/autocompleteReducer'
import usuario from 'redux/reducers/usuarioReducer'
import tipoTramite from 'redux/reducers/tipoTramiteReducer'
import auth from 'redux/reducers/authReducer'
import transferList from 'redux/reducers/transferListReducer'
import transferenciaDocumental from 'redux/reducers/transferenciaDocumentalReducer'
import conservacionDocumental from 'redux/reducers/conservacionDocumentalReducer'

const reducers = combineReducers({
   drawer,
   auth,
   usuario,
   caja,
   autoComplete,
   tipoTramite,
   transferList,
   transferenciaDocumental,
   conservacionDocumental
})

export default createStore(
   reducers,
   applyMiddleware(thunk)
)

/* export default createStore(
   reducers,
   compose(
      applyMiddleware(thunk),
      devToolsEnhancer())
) */