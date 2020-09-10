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
   listarCaja,
   cleanDataCaja,
   cleanNewIdCaja
} from 'redux/actions/cajaAction'
import {
   selectedElementEvaluador,
   selectedElementTipoTramite,
   cleanSelectedElements
} from 'redux/actions/autocompleteAction'
import handleNoty from 'helpers/noty'
import FloatIconButton from 'components/Styled/FloatIconButton'
import { DeleteSweep, Edit, Autorenew, AttachFile, FormatListNumbered, DoneAll } from '@material-ui/icons'
import { IconButton, Tooltip } from '@material-ui/core'
import ToExcel from 'components/ToExcel'
import Table from 'components/Table'
import { CREATE, UPDATE } from 'constants/crud'
import { Zoom } from 'react-reveal'
import useAuth from 'hooks/useAuth'
import Caja from 'models/Caja'

/*-> Manejadores: Para la exportación a excel... */
const ButtonToExcel = ({ rowData }) => {
   return <ToExcel
      fileName={'Caja Nro.' + `${rowData.idCaja}`.padStart(5, 0)}
      sheetName={`${rowData.idCaja}`.padStart(5, 0)}
      data={rowData.fondoDocumental}
      tooltip='Exportar'
      columns={[
         { title: 'Número Expediente', field: 'numeroExpediente' },
         { title: 'Folio', field: 'folio' },
         { title: 'NroPaquete', field: 'paquete' }
      ]}
   />
}

export default function ConservacionDocumental() {

   const dispatch = useDispatch()
   const { data: tipoTramiteData } = useSelector(store => store.tipoTramite)
   const { evaluador: selectedEvaluador, tipoTramite: selectedTipoTramite } = useSelector(store => store.autoComplete)
   const { data: usuarios } = useSelector(store => store.usuario)
   const { newIdCaja, data: cajas, loading } = useSelector(store => store.caja)
   const { data: userAuth } = useSelector(store => store.auth)
   const { userLogged } = useAuth()

   const rFile = useRef()
   const [file, setFile] = useState(null)
   const [crud, setCrud] = useState()

   /*-> Configuración la tabla... */
   /*----------------------------------------------------------------------*/
   const configTable = useMemo(() => ({
      actions: [{ icon: 'Editar' }, { icon: 'Exportar Excel' }],
      components: ({ action: { icon }, data }) => {
         if (icon === 'Editar')
            return <Tooltip title='Editar' arrow><IconButton
               onClick={() => { handlerActionEditar(data) }}
            ><Edit /></IconButton></Tooltip>
         else if (icon === 'Exportar Excel') {
            return <ButtonToExcel rowData={data} />
         }
      }
   }), [cajas])

   const dataTable = useMemo(() => ({
      columns: [
         { title: 'Nro.Caja', field: 'idCaja', type: 'number', width: 50 },
         { title: 'Serie Documental', field: 'tipoTramite', render: (rowData) => rowData.tipoTramite.descripcion, width: 300 },
         { title: 'Operador', field: 'operador', width: 350, render: ({ operador: { nombre } }) => nombre },
         { title: 'Evaluador', field: 'evaluador', width: 350 },
         { title: 'Fecha', field: 'fechaCaja', type: 'date', width: 100 },
         { title: 'Estado', field: 'estadoCaja', type: 'boolean', width: 50 }
      ],
      data: cajas
   }), [cajas])

   const handlerActionEditar = (caja) => {
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
         if (option.descripcion === selected.descripcion) {
            dispatch(selectedElementTipoTramite(selected))
            return
         }
      },
      label: (option) => option.descripcion,
      onInputChange: (e, value) => {
         dispatch(selectedElementTipoTramite({ descripcion: value }))
      }
   }

   const configAutocompleteEvaluador = {
      selected: (option, selected) => {
         if (option.login === selected.login) {
            dispatch(selectedElementEvaluador(selected))
            return
         }
      },
      label: (option) => option.nombre,
      onInputChange: (e, value) => dispatch(selectedElementEvaluador({ nombre: value }))
   }

   const handleSubmit = () => {
      if (newIdCaja === '') { handleNoty('warning', '¡No ha inicializado una caja!'); return }
      /* if (selectedEvaluador.nombre === '') { handleNoty('warning', '¡Seleccione un evaluador!'); return } */
      if (selectedTipoTramite.descripcion === '') { handleNoty('warning', '¡Seleccione un tipo de trámite!'); return }

      /*-> Payload para el `REQUEST`...*/
      const data = new FormData()
      data.append('file', file)

      switch (crud) {
         case CREATE:
            if (file === null) { handleNoty('warning', '¡No existen datos para la caja!'); return }
            data.append("caja", new Blob([JSON.stringify(
               new Caja(userAuth, selectedTipoTramite))], { type: 'application/json' }))
            dispatch(generarCaja(data))
            setFile(null) /*-> Lmpiar el state file...*/
            break
         case UPDATE:
            data.append('caja', new Blob([JSON.stringify(
               new Caja(userAuth, selectedTipoTramite, newIdCaja))], { type: 'application/json' }))
            dispatch(actualizarCaja(data))
            break
      }
   }

   const handleFile = () => rFile.current.click()

   const handleFileChange = (e) => setFile(e.target.files[0])

   const handleGenerarId = async () => {
      dispatch(generarCajaId())
      setCrud(CREATE)
   }

   const handleListar = () => dispatch(listarCaja())

   const handleLimpiarSeleccion = () => {
      dispatch(cleanSelectedElements())
      dispatch(cleanDataCaja())
      dispatch(cleanNewIdCaja())
   }

   return (
      <>
         <Zoom>
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

               {/* <AutocompleteInput
                  placeholder='Evaluador'
                  width={350}
                  variant={1}
                  config={configAutocompleteEvaluador}
                  data={usuarios}
                  inputValue={selectedEvaluador.nombre}
               /> */}

               <AutocompleteInput
                  placeholder='Serie Documental'
                  width={500}
                  variant={1}
                  config={configAutocompleteTipoTramite}
                  data={tipoTramiteData}
                  inputValue={selectedTipoTramite.descripcion}
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
            <Table dataTable={dataTable} configTable={configTable} search={false} />
         </Zoom>

         {/*-> Float control's  */}
         <FloatIconButton
            color='#999'
            tooltip='Limpiar controles'
            icon={DeleteSweep}
            positionX={{ right: '1rem' }}
            positionY={{ top: '5rem' }}
            onClick={() => { handleLimpiarSeleccion() }}
         />
         <FloatIconButton
            color='#999'
            tooltip='Listar cajas'
            icon={FormatListNumbered}
            positionX={{ right: '1rem' }}
            positionY={{ top: '9.1rem' }}
            onClick={handleListar}
            disabled={loading}
         />

         <FloatIconButton
            tooltip='Generar # de caja'
            icon={Autorenew}
            positionX={{ right: '1rem' }}
            positionY={{ top: '13.2rem' }}
            onClick={() => handleGenerarId()}
         />
         <FloatIconButton
            tooltip='Importar excel'
            icon={AttachFile}
            positionX={{ right: '1rem' }}
            positionY={{ top: '17.3rem' }}
            onClick={() => handleFile()}
         />

         <FloatIconButton
            tooltip='Generar caja'
            icon={DoneAll}
            positionX={{ right: '1rem' }}
            positionY={{ top: '21.4rem' }}
            onClick={() => handleSubmit()}
            disabled={loading}
         />
      </>
   )
}