import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import { tableIcons } from '../../helpers/icons'

function Table(props) {

   const { dataTable, configTable } = props

   const { actions, components } = configTable
   const { columns, data } = dataTable

   const [state, setState] = useState({ columns })

   useEffect(() => {
      setState((prevState) => ({ ...prevState, data }))
   }, [data])

   return (
      <MaterialTable
         icons={tableIcons}
         options={{
            pageSizeOptions: false,
            paginationType: "stepped",
            sorting: true,
            maxBodyHeight: 300,
            showTitle: false,
            showEmptyDataSourceMessage: false,
            searchFieldAlignment: "left"
         }}
         columns={state.columns}
         data={state.data}
         editable={{
            /* onRowAdd: (newData) =>
               new Promise((resolve) => {
                  setTimeout(() => {
                     resolve();
                     setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                     });
                  }, 600);
               }), */
            /* onRowUpdate: (newData, oldData) =>
               new Promise((resolve) => {
                  setTimeout(() => {
                     resolve();
                     if (oldData) {
                        setState((prevState) => {
                           const data = [...prevState.data];
                           data[data.indexOf(oldData)] = newData;
                           return { ...prevState, data };
                        });
                     }
                  }, 600);
               }), */
            /* onRowDelete: (oldData) =>
               new Promise((resolve) => {
                  setTimeout(() => {
                     resolve();
                     setState((prevState) => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                     });
                  }, 600);
               }), */
         }}
         components={{ Action: components }}
         actions={actions}
      />
   )
}

export default React.memo(Table, (prevProps, nextProps) => {
   return prevProps.dataTable === nextProps.dataTable
})