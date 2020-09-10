import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
   root: {
      margin: 'auto',
   },
   paper: ({ width, height }) => ({
      width,
      height,
      overflow: 'auto',
   }),
   button: {
      margin: theme.spacing(0.5, 0),
   },
}))

const not = (a, b) => (a.filter((value) => b.indexOf(value) === -1))

const intersection = (a, b) => (a.filter((value) => b.indexOf(value) !== -1))

export default function TransferList(props) {
   const { leftData, setLeftData, rightData, setRightData, ...rest } = props
   const classes = useStyles(rest)

   const [checked, setChecked] = useState([])

   const leftChecked = intersection(checked, leftData)
   const rightChecked = intersection(checked, rightData)

   const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value)
      const newChecked = [...checked]
      if (currentIndex === -1) newChecked.push(value)
      else newChecked.splice(currentIndex, 1)
      setChecked(newChecked);
   }

   const handleAllRight = () => {
      setRightData(rightData.concat(leftData))
      setLeftData([])
   }

   const handleCheckedRight = () => {
      setRightData(rightData.concat(leftChecked))
      setLeftData(not(leftData, leftChecked))
      setChecked(not(checked, leftChecked))
   }

   const handleCheckedLeft = () => {
      setLeftData(leftData.concat(rightChecked))
      setRightData(not(rightData, rightChecked))
      setChecked(not(checked, rightChecked))
   }

   const handleAllLeft = () => {
      setLeftData(leftData.concat(rightData))
      setRightData([])
   }

   const customList = (items) => (
      <Paper className={classes.paper}>
         <List dense component="div" role="list">
            {items.map((entity) => {
               const labelId = entity
               return (
                  <ListItem key={entity} role="listitem" button onClick={handleToggle(entity)}>
                     <ListItemIcon>
                        <Checkbox
                           checked={checked.indexOf(entity) !== -1}
                           tabIndex={-1}
                           disableRipple
                        />
                     </ListItemIcon>
                     <ListItemText id={labelId} primary={`${entity}`.padStart(10, '0')} />
                  </ListItem>
               )
            })}
            <ListItem />
         </List>
      </Paper>
   )

   return (
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
         <Grid item>
            <Typography variant='subtitle2' color='textSecondary'>Pendientes</Typography>
            {customList(leftData)}
         </Grid>
         <Grid item>
            <Grid container direction="column" alignItems="center">
               <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleAllRight}
                  disabled={leftData.length === 0}
                  aria-label="move all right"
               >
                  ≫
               </Button>
               <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
               >
                  &gt;
               </Button>
               <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
               >
                  &lt;
               </Button>
               <Button
                  variant="outlined"
                  size="small"
                  className={classes.button}
                  onClick={handleAllLeft}
                  disabled={rightData.length === 0}
                  aria-label="move all left"
               >
                  ≪
               </Button>
            </Grid>
         </Grid>
         <Grid item>
            <Typography variant='subtitle2' color='textSecondary'>Transferidos</Typography>
            {customList(rightData)}
         </Grid>
      </Grid>
   )
}