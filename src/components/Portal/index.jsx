import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { PermIdentity, VisibilityOff } from '@material-ui/icons'
import {
   Grid,
   Button,
   FormControl,
   FormControlLabel,
   FormHelperText,
   makeStyles,
   InputAdornment,
   TextField,
   CssBaseline,
   Switch
} from '@material-ui/core'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import useAuth from 'hooks/useAuth'
import { useHistory } from 'react-router-dom'

const useStyle = makeStyles((theme) => ({
   portal: {
      width: '17rem',
      backgroundColor: 'rgba(255,255,255, 0.8)',
      transform: 'rotateY(-15deg)',
   }
}))

const animaLogin = keyframes`
   from {
      background-position: right bottom;
      background-size: 1700px; 
   }
   to {
      background-position: left bottom;
      background-size: 2724px; 
   }
`

const ContainerPortal = styled.div`
   perspective: 500px;
   position: relative;
   margin: 0;
   padding: 0;
   height: 100vh;
   overflow: hidden;
   display: flex;
   justify-content: center;
   align-items: center;
   
   :after{
      content: '';
      position: absolute;
      top:0;
      left:0;
      height: 100%;
      width: 100%;
      background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Sede_MIGRACIONES.jpg/1200px-Sede_MIGRACIONES.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: right bottom;
      opacity: 0.5;
      animation: ${animaLogin} 120s;
      animation-iteration-count:infinite;
      animation-direction: alternate-reverse;
      animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);
   }
`

const MyTextField = ({ type = 'text', label, adornmentIcon: Icon, ...rest }) => {
   const [formikProps, { error, touched }] = useField(rest)
   const err = touched && error ? error : ''
   return (
      <TextField
         style={{ width: '100%' }}
         label={label}
         type={type}
         error={!!err}
         helperText={err}
         autoComplete='off'
         InputProps={{
            endAdornment: <InputAdornment position='end'><Icon /></InputAdornment>
         }}
         {...formikProps}
      />
   )
}

export default function Portal() {
   const MUIStyle = useStyle()
   const history = useHistory()

   const [isNewUser, setIsNewUser] = useState(false)

   const { logged, signup, handleAuth } = useAuth()

   useEffect(() => { logged && history.push('/') }, [logged])


   const handleOnClickNewUser = () => setIsNewUser(prevState => !prevState)

   const configFormik = {
      initialValues: {
         usuario: '',
         nombre: '',
         dni: '',
         contraseña: '',
         recontraseña: '',
      },
      validationSchema: Yup.object({
         usuario: Yup.string().required('¡Requerido!'),
         nombre: isNewUser && Yup.string().required('¡Requerido!'),
         dni: isNewUser && Yup.string().required('¡Requerido!').length(8, '¡Ingrese un número de documento valido!'),
         contraseña: Yup.string().required('¡Requerido!'),
         recontraseña: isNewUser && Yup.string().required('¡Requerido!').oneOf([Yup.ref('contraseña'), null], '¡Las constraseñas deben coincidir!')
      }),
      onSubmit: (fields, { resetForm, ...rest }) => {
         isNewUser ? signup(fields) : handleAuth(fields)
         resetForm()
      }
   }

   return (
      <>
         <CssBaseline />
         <ContainerPortal>
            <Formik {...configFormik} >
               {({ values: { usuario, nombre, contraseña, recontraseña, dni }, isSubmitting }) => (
                  <Form style={{ zIndex: 10 }}>
                     <Grid container justify='center' spacing={3} className={MUIStyle.portal}>
                        <Grid item xs={12} justify='flex-end'>
                           <FormControl>
                              <FormControlLabel
                                 control={<Switch checked={isNewUser} onClick={() => { handleOnClickNewUser() }} />}
                                 label={isNewUser ? 'Cancelar registro' : 'Registrar usuario'}
                              />
                              <FormHelperText>Opciones de registro</FormHelperText>
                           </FormControl>
                        </Grid>
                        {
                           !isNewUser
                              ? <>{/*-> Iniciar sesión...  */}
                                 <Grid item xs={12} style={{ height: '4.5rem' }}>
                                    <MyTextField name='usuario' value={usuario} label='usuario' adornmentIcon={PermIdentity} />
                                 </Grid>
                                 <Grid item xs={12} style={{ height: '4.5rem' }}>
                                    <MyTextField name='contraseña' value={contraseña} type='password' label='contraseña' adornmentIcon={VisibilityOff} />
                                 </Grid>
                              </>
                              : <>{/*-> Registrar usuario... */}
                                 <Grid item xs={12} style={{ height: '4.5rem' }}>
                                    <MyTextField name='usuario' value={usuario} label='usuario' adornmentIcon={PermIdentity} />
                                 </Grid>
                                 <Grid item xs={12} style={{ height: '4.5rem' }}>
                                    <MyTextField name='nombre' value={nombre} label='nombre' adornmentIcon={PermIdentity} />
                                 </Grid>
                                 <Grid item xs={12} style={{ height: '4.5rem' }}>
                                    <MyTextField name='dni' value={dni} label='DNI' adornmentIcon={PermIdentity} type='number' />
                                 </Grid>
                                 <Grid item xs={12} style={{ height: '4.5rem' }}>
                                    <MyTextField name='contraseña' value={contraseña} label='contraseña' adornmentIcon={VisibilityOff} type='password' />
                                 </Grid>
                                 <Grid item xs={12} style={{ height: '4.5rem' }}>
                                    <MyTextField name='recontraseña' value={recontraseña} label='repetir contraseña' adornmentIcon={VisibilityOff} type='password' />
                                 </Grid>
                              </>
                        }
                        <Grid item xs={12} style={{ paddingBottom: 0 }}>
                           <Button disabled={isSubmitting} type='submit' variant='contained' fullWidth>{isNewUser ? 'Registrar' : 'Ingresar'}</Button>
                        </Grid>
                        <Grid item xs={12} justify='flex-start' style={{ paddingLeft: '.8rem', paddingBottom: '.1rem' }} >
                           <FormHelperText>Portal de ingreso</FormHelperText>
                        </Grid>
                     </Grid>
                  </Form>
               )}
            </Formik>
         </ContainerPortal>
      </>
   )
}