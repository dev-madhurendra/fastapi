import React, { useState } from 'react'
import { TextField, IconButton, InputAdornment } from '@mui/material'
import VisibilityOn from '../../../../public/assets/icons/openEye.svg'
import VisibilityOff from '../../../../public/assets/icons/eyeclose.svg'
import IconComponent from '../icon'

export enum TextFieldSize {
  SMALL = 'small',
  MEDIUM = 'medium'
}

interface TextFieldPropsInterface {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  width?: string
  height?: string | number
  size?: TextFieldSize
  borderRadius?: string | number
}

const CustomTextField: React.FC<TextFieldPropsInterface> = ({
  placeholder,
  value,
  onChange,
  width,
  height,
  size,
  borderRadius,
  
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const textFieldStyle = {
    width: width ?? '100%',
    height: height ?? 64,
    borderRadius: '4px'
  }

  return (
    <TextField
      placeholder={placeholder}
      type={'text'}
      value={value}
      onChange={handleChange}
      fullWidth
      margin="normal"
      size={size}
    />
  )
}

export default CustomTextField