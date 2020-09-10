import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Drawer from 'components/Drawer'
import Title from 'components/Styled/Title'
import ConservacionDocumetal from 'components/ConservacionDocumetal'
import Inicio from 'components/Inicio'
import TransferenciaDocumental from 'components/TransferenciaDocumental'
import BusquedaDocumental from 'components/BusquedaDocumental'
import { useSelector } from 'react-redux'

export default function () {
   const { title } = useSelector(store => store.drawer.contentMain)
   return (
      <>
         <Drawer>
            <Title name={title} size='1.2rem' />
            <Switch>
               <Route path='/conservacion' component={ConservacionDocumetal} />
               <Route path='/busqueda' component={BusquedaDocumental} />
               <Route path='/transferencia' component={TransferenciaDocumental} />
               <Route path='/' component={() => <h1>Home</h1>} />
            </Switch>
         </Drawer>
      </>
   )
}