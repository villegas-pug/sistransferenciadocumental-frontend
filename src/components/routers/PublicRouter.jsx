import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PublicRouter({
   component: Component,
   isLogged,
   ...rest
}) {
   return (
      <Route
         {...rest}
         render={(props) => (
            isLogged ? <Redirect to='/' /> : <Component {...props} />
         )}
      />
   )
}
