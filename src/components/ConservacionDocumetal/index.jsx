import React from 'react'
import { useState, useRef, useMemo } from 'react'
import FormContainer from 'components/Styled/FormContainer'
import TextField from 'components/TextField'
import AutocompleteInput from 'components/AutocompleteInput'
import { useSelector, useDispatch } from 'react-redux'
import {
   generarCajaId,
   generarCaja,
   actualizarCajaId,
   actualizarCaja,
   listarCaja
} from 'redux/actions/cajaAction'
import {
   selectedElementEvaluador,
   selectedElementTipoTramite
} from 'redux/actions/autocompleteAction'
import handleNoty from 'helpers/noty'
import FloatIconButton from 'components/Styled/FloatIconButton'
import { Edit, ListAlt, FolderOpen, ImportExport, PermDataSetting } from '@material-ui/icons'
import { IconButton, Tooltip } from '@material-ui/core'
import ToExcel from 'components/ToExcel'
import Table from 'components/Table'
import { CREATE, UPDATE } from 'constants/crud'
import CircularProgress from 'components/CircularProgress'
import { Fade } from 'react-reveal'
import useAuth from 'hooks/useAuth'

/*-> Manejadores: Para la exportación a excel... */
const ButtonToExcel = ({ rowData }) => {
   return <ToExcel
      fileName={'Caja Nro.' + `${rowData.idCaja}`.padStart(5, 0)}
      sheetName={`${rowData.idCaja}`.padStart(5, 0)}
      data={rowData.fondoDocumental}
      tooltip='Exportar'
      columns={[
         { title: 'Número Expediente', field: 'sNumeroExpediente' },
         { title: 'Folio', field: 'nFolio' },
         { title: 'NroPaquete', field: 'sPaquete' }
      ]}
   />
}

export default function () {

   const dispatch = useDispatch()
   const { data: tipoTramiteData } = useSelector(store => store.tipoTramite.data)
   const { evaluador: selectedEvaluador, tipoTramite: selectedTipoTramite } = useSelector(store => store.autoComplete)
   const { usuarios } = useSelector(store => store.usuario.data)
   const { newIdCaja, data: cajas, loading } = useSelector(store => store.caja)
   const { userLogged } = useAuth()

   const rFile = useRef()
   const [file, setFile] = useState([])
   const [crud, setCrud] = useState()

   /*-> Configuración la tabla... */
   /*----------------------------------------------------------------------*/
   const configTable = {
      actions: [{ icon: 'Editar' }, { icon: 'Exportar Excel' }],
      components: ({ action, data }) => {
         const { icon } = action
         if (icon === 'Editar')
            return <Tooltip title='Editar' arrow><IconButton
               onClick={() => { handlerActionEditar(data) }}
            ><Edit /></IconButton></Tooltip>
         else if (icon === 'Exportar Excel') {
            return <ButtonToExcel rowData={data} />
         }
      }
   }

   const dataTable = useMemo(() => ({
      columns: [
         { title: 'Nro.Caja', field: 'idCaja', type: 'number', width: 50 },
         { title: 'Serie Documental', field: 'tipoTramite', render: (rowData) => rowData.tipoTramite.sDescripcion, width: 300 },
         { title: 'Operador', field: 'idOperadorApertura', width: 350 },
         { title: 'Evaluador', field: 'evaluador', render: (rowData) => rowData.evaluador.sNombre, width: 350 },
         { title: 'Fecha', field: 'fechaCaja', type: 'date', width: 100 },
         { title: 'Estado', field: 'estadoCaja', type: 'boolean', width: 50 }
      ],
      data: cajas
   }), [cajas])

   const handlerActionEditar = (caja) => {
      console.log(`El método handlerActionEditar, se renderizó!!!`)
      const { idCaja, evaluador, tipoTramite } = caja

      /*-> Actualiza el store: */
      dispatch(selectedElementEvaluador(evaluador))
      dispatch(selectedElementTipoTramite(tipoTramite))
      dispatch(actualizarCajaId(idCaja))
      setCrud(UPDATE)/*-> Cambia el estado del crud.. */
   }
   /*---------------------------------------------------------------------------------------------*/

   /*-> Menejadores: Para los elementos de Autocompletado...*/
   const configAutocompleteTipoTramite = {
      selected: (option, selected) => {
         if (option.sDescripcion === selected.sDescripcion) {
            dispatch(selectedElementTipoTramite(selected))
            return
         }
      },
      label: (option) => option.sDescripcion,
      onInputChange: (e, value) => {
         dispatch(selectedElementTipoTramite({ sDescripcion: value }))
      }
   }

   const configAutocompleteEvaluador = {
      selected: (option, selected) => {
         if (option.sLogin === selected.sLogin) {
            dispatch(selectedElementEvaluador(selected))
            return
         }
      },
      label: (option) => option.sNombre,
      onInputChange: (e, value) => dispatch(selectedElementEvaluador({ sNombre: value }))
   }

   const handleSubmit = () => {
      if (newIdCaja === '') { handleNoty('warning', '¡No ha inicializado una caja!'); return }
      if (file.length === 0) { handleNoty('warning', '¡No existen datos para la caja!'); return }
      if (selectedEvaluador.sNombre === '') { handleNoty('warning', '¡Seleccione un evaluador!'); return }
      if (selectedTipoTramite.sDescripcion === '') { handleNoty('warning', '¡Seleccione un tipo de trámite!'); return }

      /*-> Payload para el `REQUEST`...*/
      const data = new FormData()
      data.append('file', file)

      switch (crud) {
         case CREATE:
            data.append("caja", new Blob([JSON.stringify({
               idOperadorApertura: userLogged,
               evaluador: selectedEvaluador,
               tipoTramite: selectedTipoTramite
            })], { type: 'application/json' }))
            dispatch(generarCaja(data))
            break
         case UPDATE:
            data.append('caja', new Blob([JSON.stringify({
               idCaja: newIdCaja,
               idOperadorApertura: userLogged,
               evaluador: selectedEvaluador,
               tipoTramite: selectedTipoTramite
            })], { type: 'application/json' }))
            dispatch(actualizarCaja(data))
            break
         default:
            return
      }
   }

   const handleFile = () => rFile.current.click()

   const handleFileChange = (e) => setFile(e.target.files[0])

   const handleGenerarId = () => {
      dispatch(generarCajaId())
      setCrud(CREATE)
   }

   const handleListar = () => dispatch(listarCaja())

   return (
      <>
         <Fade left>
            <FormContainer>
               <TextField
                  label='Caja'
                  name='caja'
                  variant={2}
                  width={6}
                  type='number'
                  disabled
                  value={newIdCaja}
               />

               <AutocompleteInput
                  placeholder='Evaluador'
                  width={350}
                  variant={1}
                  config={configAutocompleteEvaluador}
                  data={usuarios}
                  inputValue={selectedEvaluador.sNombre}
               />

               <AutocompleteInput
                  placeholder='Serie Documental'
                  width={500}
                  variant={1}
                  config={configAutocompleteTipoTramite}
                  data={tipoTramiteData}
                  inputValue={selectedTipoTramite.sDescripcion}
               />

               {/* -> Input `file` */}
               <input
                  type='file'
                  name='file'
                  ref={rFile}
                  accept='.xlsx, .xls'
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
               />
            </FormContainer>
            <Table dataTable={dataTable} configTable={configTable} />
         </Fade>

         <FloatIconButton
            color='#999'
            tooltip='Listar cajas'
            icon={loading ? CircularProgress : ListAlt}
            size={4}
            positionX={{ right: '1rem' }}
            positionY={{ top: '5rem' }}
            onClick={handleListar}
            disabled={loading}
         />

         <FloatIconButton
            color='#999'
            tooltip='Generar # de caja'
            icon={FolderOpen}
            size={4}
            positionX={{ right: '1rem' }}
            positionY={{ top: '9.1rem' }}
            onClick={handleGenerarId}
         />
         <FloatIconButton
            color='#999'
            tooltip='Importar excel'
            icon={ImportExport}
            size={4}
            positionX={{ right: '1rem' }}
            positionY={{ top: '13.2rem' }}
            onClick={() => handleFile()}
         />

         <FloatIconButton
            color='#999'
            tooltip='Generar caja'
            icon={loading ? CircularProgress : PermDataSetting}
            size={4}
            positionX={{ right: '1rem' }}
            positionY={{ top: '17.3rem' }}
            onClick={() => handleSubmit()}
            disabled={loading}
         />
      </>
   )
}