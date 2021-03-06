import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function ({
   component: LayoutRouter,
   isLogged,
   ...rest
}) {
   return (
      <Route
         {...rest}
         render={(props) => (
            isLogged
               ? <LayoutRouter {...props} />
               : <Redirect to='/portal' />
         )}
      />
   )
}