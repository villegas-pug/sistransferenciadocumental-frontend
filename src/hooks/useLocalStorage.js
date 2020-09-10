import { useState } from 'react'
import { ERROR } from 'constants/levelLog'
import Noty from 'helpers/noty'

export default function useLocalStore(key, initialValue = null) {
   const [storage, setState] = useState(() => {
      try {
         const value = JSON.parse(localStorage.getItem(key)) || null
         if (value) return value
      } catch (error) {
         Noty(ERROR, `¡Ocurrió un error al intentar acceder al LOCALSTORAGE. La clave es: ${key}!`)
      } finally {
         localStorage.setItem(key, JSON.stringify(initialValue))
      }
      return initialValue
   })

   const setStorage = (payload) => {
      try {
         localStorage.setItem(key, JSON.stringify(payload))
         setState(payload)
      } catch (err) {
         Noty(ERROR, `¡Ocurrió un error al intentar suministrar al LOCALSTORAGE. La llave es: ${key}!`)
      }
   }

   const removeStorage = () => {
      try { localStorage.removeItem(key) }
      catch (err) { Noty(ERROR, '¡Ocurrió un error!. El elemento no fué eliminado del LOCALSTORAGE.') }
   }

   return [
      storage,
      setStorage,
      removeStorage
   ]
}