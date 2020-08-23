import { useState } from 'react'

export const useLocalStore = (key, initialValue) => {
   const [storage, setState] = useState(() => {
      try {
         const value = localStorage.getItem(key) || initialValue
         return JSON.parse(value)
      } catch (err) {
         return initialValue
      }
   })

   const setStorage = (payload) => {
      try {
         localStorage.setItem(key, JSON.stringify(payload))
         setState(localStorage.getItem(element))
      } catch (err) {
         console.log(err)
      }
   }

   return [
      storage,
      setStorage
   ]
}