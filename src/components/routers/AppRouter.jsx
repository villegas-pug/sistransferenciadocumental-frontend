import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { obtenerUsuario } from 'redux/actions/usuarioAccion'
import { obtenerTipoTramite } from 'redux/actions/tipoTramiteAction'
import LayoutRouter from 'components/routers/LayoutRouter'
import useAuth from 'hooks/useAuth'
import PrivateRouter from 'components/routers/PrivateRouter'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

export default function () {
   const { userLogged, logged } = useAuth()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(obtenerUsuario())
      dispatch(obtenerTipoTramite())
   }, [])

   return (
      <BrowserRouter>
         <Switch>
            <Route path='/portalIngreso' render={() => (<h1>Login</h1>)} />
            <PrivateRouter path='/' component={LayoutRouter} isLogged={logged} />
         </Switch>
      </BrowserRouter>
   )
}