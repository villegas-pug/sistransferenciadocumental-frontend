import React from 'react'
import { Redirect } from 'react-router-dom'

export default function ({
   component: LayoutRouter,
   isLogged,
   ...rest
}) {
   return (
      <>
         {
            isLogged
               ? <LayoutRouter {...rest} />
               : <Redirect to='/portalIngreso' />
         }
      </>
   )
}