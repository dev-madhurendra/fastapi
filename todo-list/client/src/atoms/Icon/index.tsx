import React from 'react'
import styled from '@emotion/styled'

interface IconComponentPropsInterface {
  width?: string
  height?: string
  src: string
  onClick?: () => void
}

const StyledIcon = styled.img`
  cursor: pointer;
`
const IconComponent = ({ src, width, height, onClick }: IconComponentPropsInterface) => {
  return (
    <StyledIcon
      src={src}
      width={width}
      height={height}
      alt="icon"
      onClick={onClick}
    />
  )
}

export default IconComponent