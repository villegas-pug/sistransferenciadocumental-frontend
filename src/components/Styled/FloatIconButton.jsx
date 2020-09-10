import React from 'react'
import { IconButton, makeStyles, Tooltip } from '@material-ui/core'
import Tada from 'react-reveal/Tada'

const useStyle = makeStyles({
   iconButton: ({ size = 4, color = '#999', positionX, positionY }) => ({
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
      '&:disabled': {
         backgroundColor: '#fff'
      },
      '&:hover': {
         backgroundColor: '#999',
         '& span svg *': {
            color: '#fff'
         }
      }
   }),
   icon: ({ size = 4 }) => ({
      fontSize: `${size - 2}rem`,
      marginTop: '.5rem',
      '&:hover': {
         color: '#fff'
      }
   })
})

export default (props) => {
   const { icon: Icon, disabled, onClick, tooltip, ...rest } = props
   const style = useStyle(rest)
   return (
      <>
         <Tooltip title={tooltip} placement='left' arrow>
            <IconButton
               className={style.iconButton}
               disabled={disabled}
               onClick={onClick}
               {...rest}
            >
               <Tada>
                  {/* <CircularProgress /> */}
                  <Icon className={style.icon} />
               </Tada>
            </IconButton>
         </Tooltip>
      </>
   )
}