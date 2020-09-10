import React, { useMemo } from 'react'
import { Formik, Form, useField } from 'formik'
import { Box, TextField } from '@material-ui/core'
import FloatIconButton from 'components/Styled/FloatIconButton'
import { DeleteSweep, FindInPage } from '@material-ui/icons'
import Table from 'components/Table'
import * as Yup from 'yup'
import { Zoom } from 'react-reveal'
import { useSelector, useDispatch } from 'react-redux'
import { buscarConservacion, cleanDataConservacion } from 'redux/actions/conservacionDocumentalAccion'
import FondoDocumental from 'models/FondoDocumental'

const MyTextField = ({ label, type, width, ...props }) => {
   const [propsFormik, meta] = useField(props)
   const err = meta.error ? meta.error : ''
   return (
      <Zoom>
         <TextField
            type={type}
            label={label}
            style={{ width: `${width}rem` }}
            error={!!err}
            helperText={err}
            InputLabelProps={type === 'date' && { shrink: true }}
            autoComplete='off'
            {...propsFormik}
         />
      </Zoom>
   )
}

export default function BusquedaDocumental() {

   const { data: fondoDocumentalDb, loading } = useSelector(store => store.conservacionDocumental)
   const dispatch = useDispatch()

   const dataTable = useMemo(() => ({
      columns: [
         { title: '# expediente', field: 'numeroExpediente', width: 200 },
         { title: '# caja', field: 'idCaja', width: 50, render: ({ caja: { idCaja } }) => idCaja },
         { title: 'Fecha registro', field: 'fechaCaja', width: 150, type: 'date', render: ({ caja: { fechaCaja } }) => fechaCaja },
         {
            title: 'Fecha transferencia',
            field: 'fechaTransferencia',
            width: 150,
            type: 'date',
            render: ({ caja: { transferencia } }) => transferencia !== null ? transferencia.fechaTransferencia : ''
         },
         {
            title: 'Estado',
            field: 'estadoTransferencia',
            width: 150,
            render: ({ caja: { transferencia } }) => transferencia !== null && 'Transferido'
         }
      ],
      data: fondoDocumentalDb
   }), [fondoDocumentalDb])

   const configTable = {
      actions: [],
      components: () => { }
   }

   const configFormik = {
      initialValues: {
         numeroExpediente: ''
      },
      validationSchema: Yup.object({
         numeroExpediente: Yup.string().required('¡Campo requerido, para iniciar la busqueda!')
      }),
      onSubmit: ({ numeroExpediente }, { resetForm }) => {
         dispatch(buscarConservacion(new FondoDocumental(numeroExpediente)))
         resetForm()
      },
      onReset: (fields, meta) => {
         dispatch(cleanDataConservacion())
      }
   }

   return (
      <>
         <>
            <Formik {...configFormik} >
               {({ values: { numeroExpediente }, isSubmitting }) => (
                  <Form>
                     <Box display='flex' flexWrap='grap' justifyContent='flex-start' p={1} style={{ width: '100%', height: '5rem' }}>
                        <Box p={0} pl={4} >
                           <MyTextField label='#expediente' name='numeroExpediente' value={numeroExpediente} width={16} />
                        </Box>
                     </Box>
                     <>
                        {/*-> Botones flotantes */}
                        <FloatIconButton
                           type='submit'
                           icon={FindInPage}
                           disabled={false}
                           tooltip='Buscar'
                           positionX={{ right: '1rem' }}
                           positionY={{ top: '10rem' }}
                           disabled={loading}
                        />
                        <FloatIconButton
                           type='reset'
                           icon={DeleteSweep}
                           disabled={false}
                           tooltip='Limpiar'
                           onClick={() => { }}
                           positionX={{ right: '1rem' }}
                           positionY={{ top: '14.1rem' }}
                        />
                     </>
                  </Form>
               )}
            </Formik>

            {/*-> Tabla de busqueda...  */}
            <Zoom>
               <Table dataTable={dataTable} configTable={configTable} search={false} maxBodyHeight={280} />
            </Zoom>
         </>
      </>
   )
}