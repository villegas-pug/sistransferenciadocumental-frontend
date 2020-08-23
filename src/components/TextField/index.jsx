import React from 'react'
import { TextField, makeStyles } from '@material-ui/core'

const useStyle = makeStyles({
   customized: ({ width, color }) => {
      return {
         width: width ? `${width}rem` : '15rem',
         color: color ? color : '#F2F2F2',
         margin: '.5rem'
      }
   }
})

export default (props) => {
   const { type, value, name, label, variant, disabled, handleChange, handleBlur } = props
   const clsMUI = useStyle(props)
   return (
      <TextField
         className={clsMUI.customized}
         autoComplete='off'
         label={label}
         size='small'
         variant={variant == 1 ? 'outlined' : 'filled'}
         name={name}
         type={type && type}
         value={value}
         onChange={handleChange}
         onBlur={handleBlur}
         disabled={disabled}
      />
   )
}