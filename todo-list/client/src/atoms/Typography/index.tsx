import { Typography as MuiTypography, type TypographyProps } from '@mui/material'
import React from 'react'

export interface ITypography extends TypographyProps {
  text: string | number
  variant?: 'h1' | 'h2' | 'subtitle1' | 'body1' | 'body2' | 'caption1' | 'caption2' | 'caption3'
}

const Typography = ({
  variant,
  text,
  ...props
}: ITypography): React.JSX.Element => (
  <MuiTypography variant={variant} {...props}>
    {text}
  </MuiTypography>
)

export default Typography