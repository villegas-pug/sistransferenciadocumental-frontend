import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth, authLogout } from 'redux/actions/authAction'
import { crearUsuario } from 'redux/actions/usuarioAccion'
import useLocalStorage from 'hooks/useLocalStorage'
import Usuario from 'models/Usuario'

export default function useAuth() {
   const [{ login, nombre }, setUserStorage, removeUserStorage] = useLocalStorage('user', new Usuario())

   const { data: userAuth } = useSelector(store => store.auth)
   const dispatch = useDispatch()

   useEffect(() => { setUserStorage(userAuth) }, [userAuth])

   const handleAuth = ({ usuario, contraseña }) => { dispatch(auth(new Usuario(usuario, contraseña))) }

   const logout = () => { dispatch(authLogout()) && removeUserStorage() }

   const signup = (payload) => {
      const { usuario, nombre, dni, contraseña } = payload
      dispatch(crearUsuario(new Usuario(usuario, contraseña, nombre, dni)))
   }

   return {
      logged: Boolean(login),
      userLogged: nombre,
      handleAuth,
      logout,
      signup
   }
}