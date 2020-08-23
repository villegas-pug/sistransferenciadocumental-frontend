import React from 'react'
import styled from 'styled-components'

const FormGroup = styled.div`
   display: flex;
   flex-direction: column;
   margin: 0.5rem;
`
export default (props) => {
   return (
      <FormGroup>
         {props.children}
      </FormGroup>
   )
}