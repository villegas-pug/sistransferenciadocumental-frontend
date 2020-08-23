import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Drawer from 'components/Drawer'
import Title from 'components/Styled/Title'
import ConservacionDocumetal from 'components/ConservacionDocumetal'
import Inicio from 'components/Inicio'
import { useSelector } from 'react-redux'

export default function () {
   const { title } = useSelector(store => store.drawer.contentMain)
   return (
      <>
         <Drawer>
            <Title name={title} size='1.2rem' />
            <Switch>
               <Route path='/conservacion' component={ConservacionDocumetal} />
               <Route path='/busqueda' component={Inicio} />
               <Route path='/transferencia' component={Inicio} />
               <Route path='/' component={() => <h1>Home</h1>} />
            </Switch>
         </Drawer>
      </>
   )
}