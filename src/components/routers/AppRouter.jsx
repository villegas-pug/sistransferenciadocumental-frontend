import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { obtenerUsuario } from 'redux/actions/usuarioAccion'
import { obtenerTipoTramite } from 'redux/actions/tipoTramiteAction'
import LayoutRouter from 'components/routers/LayoutRouter'
import useAuth from 'hooks/useAuth'
import PrivateRouter from 'components/routers/PrivateRouter'
import PublicRouter from 'components/routers/PublicRouter'
import Portal from 'components/Portal'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function () {
   const { logged } = useAuth()
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(obtenerUsuario())
      dispatch(obtenerTipoTramite())
   }, [])

   return (
      <BrowserRouter basename='/sistransferenciadocumental'>
         <Switch>
            <PublicRouter path='/portal' component={Portal} isLogged={logged} />
            <PrivateRouter path='/' component={LayoutRouter} isLogged={logged} />
         </Switch>
      </BrowserRouter>
   )
}