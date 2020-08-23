import React from 'react'
import { IconButton, makeStyles, Tooltip } from '@material-ui/core'
import Tada from 'react-reveal/Tada'

const useStyle = makeStyles({
   iconButton: ({ size, color, positionX, positionY }) => ({
      padding: 0,
      position: 'fixed !important',
      color: color && color,
      backgroundColor: '#fff',
      border: color && `1px solid ${color}`,
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex: 50,
      ...positionX,
      ...positionY,
      '&:hover': {
         backgroundColor: '#999'
      }
   }),
   icon: ({ size }) => ({
      fontSize: `${size - 1.4}rem`,
      marginTop: '.45rem',
      '&:hover': {
         color: '#fff'
      }
   })
})

export default (props) => {
   const { icon: Icon, disabled, onClick, tooltip } = props
   const style = useStyle(props)
   return (
      <>
         <Tooltip title={tooltip} placement='left' arrow>
            <IconButton
               className={style.iconButton}
               disabled={disabled}
               onClick={onClick}
            >
               <Tada>
                  <Icon className={style.icon} />
               </Tada>
            </IconButton>
         </Tooltip>
      </>
   )
}