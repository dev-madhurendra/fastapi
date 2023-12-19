import React from 'react'
import MuiTypography from '../../atoms/Typography'
import CustomTextField, { TextFieldSize } from '../../atoms/textField'
import { Stack } from '@mui/material'
import styled from '@emotion/styled'

interface TypographyInputPropsInterface {
  label: string
  color?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  isPassword: boolean
  width?: string
  height?: string | number
  size?: TextFieldSize
  borderRadius?: string | number
  variant: 'h1' | 'h2' | 'subtitle1' | 'body1' | 'body2' | 'caption1' | 'caption2' | 'caption3'
}

const StyleTextfield= styled(CustomTextField)`
    && .textField:hover {
        outline: none;
    }

`
const TypographyInput: React.FC<TypographyInputPropsInterface> = ({
  label,
  placeholder,
  value,
  onChange,
  isPassword,
  color,
  width,
  height,
  size,
  borderRadius,
  variant
}) => {
  return (
    <Stack spacing={3}>
      <MuiTypography variant={variant} text={label} color={color} />
      <StyleTextfield
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isPassword={isPassword}
        width={width}
        height={height}
        size={size}
        borderRadius={borderRadius}
      />
    </Stack>
  )
}

export default TypographyInput