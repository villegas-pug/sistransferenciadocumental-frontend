import React from 'react'
import { makeStyles, CircularProgress } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
   customized: ({ color }) => ({
      color: color ? color : '#999',
      marginRight: '.5rem',
   })
}))

export default function (props) {
   const { size } = props
   const clsMUI = useStyle(props)
   return (
      <CircularProgress size={size ? size : 40} className={clsMUI.customized} />
   )
}