import { Button, ButtonProps } from "@mui/material";
import React from "react";

interface ButtonPropsInterface extends ButtonProps {}

const MuiButton = ({ ...buttonProps }: ButtonPropsInterface) => {
  return <Button {...buttonProps} disableElevation disableRipple />;
};

export default MuiButton;