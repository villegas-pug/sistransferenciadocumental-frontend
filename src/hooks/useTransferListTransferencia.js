import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { listarCaja } from 'redux/actions/cajaAction'
import {
   updateLeftListTransferencia,
   updateRigthListTransferencia,
   loadLeftListTransferencia,
   loadRigthListTransferencia
} from 'redux/actions/transferListAction'
import {
   generarTransferencia,
   actualizarTransferencia,
   eliminarCajasTransferencia
} from 'redux/actions/transferenciaDocumentalAction'
import TransferenciaDocumental from 'models/TransferenciaDocumental'
import Noty from 'helpers/noty'
import { WARNING } from 'constants/levelLog'
import { PENDIENTE, PARCIAL, TRANSFERIDO } from 'constants/transferenciaDocumental'

export default () => {

   const dispatch = useDispatch()
   const { data: cajas } = useSelector(store => store.caja)
   const { data: userAuth } = useSelector(store => store.auth)

   const {
      transferenciaDocumental: {
         leftData, rightData, estado: estadoTransferencia, idTransferenciaToEdit
      }
   } = useSelector(store => store.transferList)

   const [isTransferido, setIsTransferido] = useState(false)

   /*-> Al montar el componente...  */
   useEffect(() => { dispatch(listarCaja()) }, [])

   useEffect(() => {
      if (isTransferido) dispatch(loadRigthListTransferencia(cajas))
      else dispatch(loadLeftListTransferencia(cajas))
   }, [isTransferido, cajas])

   const setLeftData = (payload) => { dispatch(updateLeftListTransferencia(payload)) }

   const setRightData = (payload) => { dispatch(updateRigthListTransferencia(payload)) }

   /*-> Genera una transferencia... */
   const handleTransferenciaDocumental = (anexo) => {
      const data = new FormData()
      data.append("anexo", anexo)

      switch (estadoTransferencia.toUpperCase()) {
         case PENDIENTE:
            if (rightData.length === 0) { Noty(WARNING, '¡No existen cajas a transferir!'); return }
            data.append('transferencia', new Blob([JSON.stringify(
               new TransferenciaDocumental(rightData, userAuth)
            )], { type: 'application/json' }))
            /*-> Actulizar store... */
            dispatch(generarTransferencia(data))
            break
         case PARCIAL:
            console.log(idTransferenciaToEdit)
            data.append('transferencia', new Blob([JSON.stringify(
               new TransferenciaDocumental(rightData, userAuth, idTransferenciaToEdit))],
               { type: 'application/json' }))
            dispatch(actualizarTransferencia(data))
            break
         case TRANSFERIDO:
            if (leftData.length === 0) { Noty(WARNING, '¡Seleccione al menos una caja, para retornar!'); return }
            /*-> Actualizar store...*/
            dispatch(eliminarCajasTransferencia(new TransferenciaDocumental(leftData, userAuth)))
            break
      }

   }

   return {
      handleTransferenciaDocumental,
      estadoTransferencia,
      isTransferido,
      setIsTransferido,
      leftData,
      setLeftData,
      rightData,
      setRightData
   }
}