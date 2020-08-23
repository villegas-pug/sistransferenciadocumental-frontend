import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux'
import AppRouter from 'components/routers/AppRouter'

ReactDOM.render(
   <Provider store={store}>
      <AppRouter />
   </Provider >,
   document.getElementById('root')
)