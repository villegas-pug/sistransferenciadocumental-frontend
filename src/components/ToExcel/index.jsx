import React from 'react'
import { modules } from 'react-export-excel'
import { Tooltip, IconButton } from "@material-ui/core"
import { GridOn } from '@material-ui/icons'

export default ({ fileName, sheetName, data, columns, tooltip }) => {

   const { ExcelFile, ExcelSheet, ExcelColumn } = modules

   return (
      <>
         <ExcelFile filename={fileName} element={<Tooltip title={tooltip} arrow><IconButton><GridOn /></IconButton></Tooltip>}>
            <ExcelSheet
               name={sheetName}
               data={data}
            >
               {
                  columns.map((obj, key) => (
                     <ExcelColumn key={key} label={obj.title} value={obj.field} />
                  ))
               }
            </ExcelSheet>
         </ExcelFile>

      </>
   )
}
