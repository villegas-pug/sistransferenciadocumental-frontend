import { useSelector } from 'react-redux'

export default () => {

   const { user: { sNombre: userLogged }, logged } = useSelector(store => store.auth)

   const handleAuth = (user, password) => { }

   return {
      logged,
      userLogged,
      handleAuth
   }
}