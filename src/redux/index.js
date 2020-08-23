import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { devToolsEnhancer } from 'redux-devtools-extension'
import drawer from 'redux/reducers/drawerReducer'
import cajaReducer from 'redux/reducers/cajaReducer'
import autoCompleteReducer from 'redux/reducers/autocompleteReducer'
import usuarioReducer from 'redux/reducers/usuarioReducer'
import tipoTramiteReducer from 'redux/reducers/tipoTramiteReducer'
import authReducer from "redux/reducers/authReducer"

const reducers = combineReducers({
   drawer,
   auth: authReducer,
   usuario: usuarioReducer,
   caja: cajaReducer,
   autoComplete: autoCompleteReducer,
   tipoTramite: tipoTramiteReducer
})

export default createStore(
   reducers,
   compose(
      applyMiddleware(thunk),
      devToolsEnhancer())
)