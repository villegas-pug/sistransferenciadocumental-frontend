import React, { useState, useRef, useMemo } from 'react'
import { END_POINT_BASE } from 'constants/endpointBase'
import TransferList from 'components/TransferList'
import {
   FormControl,
   FormControlLabel,
   FormHelperText,
   Switch,
   Button,
   Box,
   IconButton,
   Tooltip
} from '@material-ui/core'
import { Edit, DeleteForever, NavigateNext, NavigateBefore, AttachFile, Send, Publish, GetApp, CancelScheduleSend } from '@material-ui/icons'
import useTransferListTransferencia from 'hooks/useTransferListTransferencia'
import FloatIconButton from 'components/Styled/FloatIconButton'
import Table from 'components/Table'
import { Fade, Zoom } from 'react-reveal'
import { useSelector, useDispatch } from 'react-redux'
import { listarTransferencia } from 'redux/actions/transferenciaDocumentalAction'
import { loadRigthListToEditTransferencia } from 'redux/actions/transferListAction'
import { useEffect } from 'react'

const configTransferList = { height: 370, width: 220 }

export default function TransferenciaDocumental() {

   const { data: transferencias } = useSelector(store => store.transferenciaDocumental)
   const { data: cajas } = useSelector(store => store.caja)
   const dispatch = useDispatch()
   const rAnexo = useRef()
   const [nextPage, switchNextPage] = useState(false)
   const [anexo, setAnexo] = useState(null)

   useEffect(() => { dispatch(listarTransferencia()) }, [nextPage])

   const {
      isTransferido,
      setIsTransferido,
      estadoTransferencia,
      handleTransferenciaDocumental,
      ...actionTransferList
   } = useTransferListTransferencia()

   const dataTable = useMemo(() => ({
      columns: [
         { title: 'N°', field: 'idTransferencia', type: 'number', width: 50 },
         { title: 'Estado', field: 'idEstadoTransferencia', width: 120, render: ({ idEstadoTransferencia: id }) => id === 1 ? 'Transferido' : 'No transfereido' },
         { title: 'Fecha', field: 'fechaTransferencia', type: 'date', width: 120 },
         { title: 'Encargado transferencia', field: 'encargadoTransferencia', render: ({ encargadoTransferencia: { nombre } }) => nombre, width: 320 },
         { title: 'Total cajas', field: 'cajas', type: 'number', render: ({ cajas }) => cajas.length, width: 140 },
         {
            title: 'Total expedientes',
            field: 'cajas',
            type: 'number',
            render: ({ cajas }) => {
               return cajas.reduce((counter, nextValue) => (counter + nextValue.fondoDocumental.length), 0)
            },
            width: 170,
         },
      ],
      data: transferencias
   }), [transferencias])
   const configTable = useMemo(() => ({
      actions: [
         { tooltip: 'Editar' }, { tooltip: 'Eliminar' }, { tooltip: 'Ver documento' }
      ],
      components: ({ action: { tooltip }, data: rowData }) => {
         if (tooltip === 'Editar') {
            return <Tooltip title={tooltip}><IconButton onClick={() => handleTableOnClickEditar(rowData)}><Edit /></IconButton></Tooltip>
         } else if (tooltip === 'Eliminar') {
            return <Tooltip title={tooltip}><IconButton><DeleteForever /></IconButton></Tooltip>
         } else if (tooltip === 'Ver documento') {
            return <Tooltip title={tooltip}><IconButton onClick={() => handleDownloadAnexo(rowData.idTransferencia)}> <GetApp /> </IconButton></Tooltip>
         }
      }
   }), [transferencias])

   /*-> Handler's: Vista principal... */
   const handleDownloadAnexo = (idAnexo) => { window.open(`${END_POINT_BASE}/transferencia-documental/downloadAnexo/${idAnexo}`) }

   const handleOnClickAnexo = () => { rAnexo.current.click() }

   const handleOnChangeAnexo = (e) => { setAnexo(e.target.files[0]) }

   /*-> Handler's: Vista secundaria 01... */
   const handleOnClickSend = () => { handleTransferenciaDocumental(anexo) }

   const handleTableOnClickEditar = (transferencia) => {
      switchNextPage(false) /*-> prevPage... */
      dispatch(loadRigthListToEditTransferencia({ transferencia, cajas }))
   }

   return (
      <>
         {
            !nextPage &&
            <>
               <Zoom>
                  <FormControl component='fieldset' style={{ width: '100%' }}>
                     <Box display='flex'>
                        <Box>
                           <FormControlLabel
                              control={<Switch checked={isTransferido} onChange={() => setIsTransferido(!isTransferido)} />}
                              label={estadoTransferencia}
                           />
                        </Box>
                        <Box ml='auto'>
                           <Button variant='text' onClick={() => { switchNextPage(prevState => !prevState) }}>
                              Ir a transferencias
                           <NavigateNext />
                           </Button>
                        </Box>
                     </Box>
                     <FormHelperText>Listar por estado</FormHelperText>
                  </FormControl>
                  <TransferList {...configTransferList} {...actionTransferList} />
               </Zoom>
               <>
                  <input type='file' hidden accept='application/pdf' ref={rAnexo} onChange={handleOnChangeAnexo} />
                  {
                     !isTransferido &&
                     <FloatIconButton
                        icon={AttachFile}
                        positionX={{ right: '1rem' }}
                        positionY={{ top: '11rem' }}
                        tooltip='Anexar documento'
                        disabled={false}
                        onClick={handleOnClickAnexo}
                     />
                  }
                  <FloatIconButton
                     icon={!isTransferido ? Send : CancelScheduleSend}
                     positionX={{ right: '1rem' }}
                     positionY={{ top: '15.1rem' }}
                     tooltip={!isTransferido ? 'Enviar...' : 'Cancelar transferencia...'}
                     disabled={false}
                     onClick={handleOnClickSend}
                  />
               </>
            </>
         }
         {/*-> Sección: Ver transferencia...  */}
         <>
            {
               nextPage &&
               <>
                  <Fade left>
                     <Box display='flex' style={{ width: '100%', marginBottom: '.3rem' }}>
                        <Box mr='auto'>
                           <Button variant='text' onClick={() => { switchNextPage(prevState => !prevState) }}>
                              <NavigateBefore />
                              Regresar
                           </Button>
                        </Box>
                     </Box>
                     <Table dataTable={dataTable} configTable={configTable} search={false} />
                  </Fade>
               </>
            }
         </>
      </>
   )
}