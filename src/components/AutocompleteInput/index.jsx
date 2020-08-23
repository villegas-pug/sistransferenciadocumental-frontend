import React, { useEffect, useState, useRef } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

const sleep = (delay = 0) => {
   return new Promise((resolve) => {
      setTimeout(resolve, delay)
   })
}

function MenuAutocomplete(props) {
   const { placeholder, width, variant, config, data, inputValue } = props
   const { selected: handleSelected, label: handleLabel, onInputChange } = config

   const [open, setOpen] = React.useState(false)
   const [options, setOptions] = React.useState([])
   const loading = open && options.length === 0

   useEffect(() => {
      let active = true

      if (!loading) { return undefined }

      (async () => {
         await sleep(1000)
         if (active) setOptions(data)
      })()

      return () => {
         active = false
      }
   }, [loading])

   useEffect(() => { !open && setOptions([]) }, [open])

   return (
      <Autocomplete
         inputValue={inputValue}
         onInputChange={onInputChange}
         autoSave='false'
         style={{ width: width }}
         open={open}
         onOpen={() => setOpen(true)}
         onClose={() => setOpen(false)}
         getOptionSelected={(option, value) => {
            if (open) return
            handleSelected(option, value)
         }}
         getOptionLabel={handleLabel}
         options={options}
         loading={loading}
         renderInput={(params) => (
            <TextField
               {...params}
               label={placeholder}
               variant={variant == 1 ? 'standard' : 'outlined'}
               InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                     <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                     </>
                  ),
               }}
            />
         )}
      />
   )
}

export default React.memo(MenuAutocomplete)