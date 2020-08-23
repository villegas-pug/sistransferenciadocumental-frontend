import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { fontFamily } from '../../config/font'

const Title = styled.title`
   display: block;
   font-family: ${fontFamily.title};
   font-size: ${ ({ size }) => (size ? size : '1.8rem')} ;
   color: ${({ color }) => (color ? color : '#000')};
   text-align: center;
`

export default (props) => {
   const { name, size, color } = props
   return (
      <Title size={size} color={color}>
         {name}
      </Title>
   )
}