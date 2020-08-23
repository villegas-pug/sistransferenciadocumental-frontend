import React from 'react'
import { makeStyles, Icon } from '@material-ui/core'
import { Button } from '@material-ui/core'

const useStyle = makeStyles({
   customMUI: ({ color }) => ({
      margin: 'auto 0 auto .5rem',
      color: color && color,
      border: color && `1px solid ${color}`,
   })
})

export default (props) => {
   const clsMUI = useStyle(props)
   const { variant, value, Icon, disabled, onClick } = props
   return (
      <Button
         className={clsMUI.customMUI}
         size='medium'
         variant={variant == 1 ? 'outlined' : 'contained'}
         disabled={disabled}
         onClick={onClick}
         Upload
      >
         <Icon />
         {value}
      </Button>
   )
}