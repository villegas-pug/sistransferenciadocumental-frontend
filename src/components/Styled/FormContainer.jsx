import React from 'react';
import styled from 'styled-components'

const FormContainer = styled.form`
   padding: 0 .5rem;
   margin: auto;
   display: flex;
   flex-wrap: wrap;
   justify-content: flex-start;
   border: 1px solid #999;
   border:0;

   div, label{
      margin-left: .5rem;
   }

`

export default (props) => {
   const { handleSubmit } = props
   return (
      <FormContainer
         onSubmit={handleSubmit}
      >
         {props.children}
      </FormContainer>
   )
}