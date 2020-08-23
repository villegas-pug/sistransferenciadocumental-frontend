import React, { useState } from 'react';
import FormContainer from '../Styled/FormContainer'
import TextField from '../TextField'
import { useFormik } from 'formik'
import { Alert } from '@material-ui/lab'
import { Button } from '@material-ui/core'
import FormGroup from '../Styled/FormGroup'
import { useDebounce } from 'use-debounce'
import * as Yup from 'yup'

const Index = () => {
   const {
      values,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
   } = useFormik({
      initialValues: {
         cliente: '',
         telefono: '',
         pedido: '',
         dirección: '',
         referencia: '',
         precio: '',
         flete: '',
         tipo_pago: ''
      },
      validationSchema: Yup.object().shape({
         cliente: Yup.string().required('¡Campo obligatorio!'),
         telefono: Yup.string().required('Campo obligatorio')
            .min(7, 'Mínimo permitido de digitos es 7'),
         pedido: Yup.string().required('Campo requerido'),
         dirección: Yup.string().required('Campo requerido'),
         referencia: Yup.string().required('Campo requerido'),
         precio: Yup.string()
            .required('Campo obligatorio')
            .matches(/^[0-9]+$/, '¡Ingresar solo digitos!')
            .min(7, 'El mínimo de digitos permitidos es 7'),
         flete: Yup.string()
            .required('Campo obligatorio')
            .matches(/^[0-9]+$/, '¡Ingresar solo digitos!')
            .min(7, 'El mínimo de digitos permitidos es 7'),
         tipo_pago: Yup.string()
            .required('Campo obligatorio')
            .matches(/^[a-zA-Z]+$/, '¡Solo letras!')
      }),
      onSubmit: (values) => {

      }
   })

   const handleOnSubmit = () => { handleSubmit() }

   return (
      <>
         <FormContainer
            handleSubmit={handleSubmit}
         >
            <FormGroup>
               <TextField
                  label='Cliente'
                  size='small'
                  variant={2}
                  width={30}
                  name='cliente'
                  value={values.cliente}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
               />
               {errors.cliente
                  && <Alert severity='error'> {errors.cliente}</Alert>}
            </FormGroup>

            <FormGroup>
               <TextField
                  label='Telefono'
                  size='small'
                  variant={2}
                  width={10}
                  name='telefono'
                  value={values.telefono}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
               />
               {errors.telefono
                  && <Alert severity='error'> {errors.telefono}</Alert>}
            </FormGroup>

            <FormGroup>
               <TextField
                  label='Pedido'
                  size='small'
                  variant={2}
                  width={40}
                  name='pedido'
                  value={values.pedido}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
               />
               {errors.pedido
                  && <Alert severity='error'> {errors.pedido}</Alert>}

            </FormGroup>

            <FormGroup>

               <TextField
                  label='Dirección'
                  size='small'
                  variant={2}
                  width={40}
                  name='dirección'
                  value={values.dirección}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
               />
               {errors.dirección
                  && <Alert severity='error'> {errors.dirección}</Alert>}
            </FormGroup>

            <FormGroup>
               <TextField
                  label='Referencia'
                  size='small'
                  variant={2}
                  width={50}
                  name='referencia'
                  value={values.referencia}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
               />
               {errors.referencia
                  && <Alert severity='error'> {errors.referencia}</Alert>}
            </FormGroup>

            <FormGroup>
               <TextField
                  label='Precio'
                  size='small'
                  variant={2}
                  width={5}
                  name='precio'
                  value={values.precio}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
               />
               {errors.precio
                  && <Alert severity='error'> {errors.precio}</Alert>}
            </FormGroup>

            <FormGroup>
               <TextField
                  label='Flete'
                  size='small'
                  variant={2}
                  width={5}
                  name='flete'
                  value={values.flete}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
               />
               {errors.flete
                  && <Alert severity='error'> {errors.flete}</Alert>}
            </FormGroup>

            <FormGroup>
               <TextField
                  label='Tipo Pago'
                  size='small'
                  variant={2}
                  width={20}
                  name='tipo_pago'
                  value={values.tipo_pago}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
               />
               {errors.tipo_pago
                  && <Alert severity='error'> {errors.tipo_pago}</Alert>}
            </FormGroup>

         </FormContainer>
         <Button
            color='primary'
            variant='outlined'
            size='medium'
            onClick={handleOnSubmit}
            disabled={isSubmitting}
         >
            Generar
         </Button>
      </>
   )
}

export default Index;