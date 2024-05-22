import React from "react";
import { styled, Theme } from "@mui/system";
import { alpha } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  InputBase,
  InputBaseProps,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface Props {
  label?: string;
  isPassword?: boolean;
  helperText?: string;
  error?: boolean;
  sx?: any;
}
interface MyTheme extends Theme {
  transitions: {
    create: (props: string | string[]) => string;
  };
}
const CustomInput =styled(InputBase, { skipSx: false })<Props>(({ theme }: { theme: Theme } & Props) => ({
  "label + &": {
      marginTop: theme.spacing(3)
  },
  "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#F3F6F9" : "#1A2027",
      border: "1px solid",
      borderColor: theme.palette.mode === "light" ? "#c0c2c5" : "#2D3843",
      fontSize: 16,
      padding: "10px 12px",
      transition: (theme as MyTheme).transitions.create(["border-color", "background-color", "box-shadow"]),
      "&:focus": {
          boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
          borderColor: theme.palette.primary.main
      }
  }
}));

const Input = (props: Props & Omit<InputBaseProps, keyof Props>) => {
  const { label, id, type, isPassword, fullWidth, helperText, error, sx, ...other } = props;
  const [inputType, setInputType] = React.useState(
    isPassword ? "password" : props.type
  );

  const IconEndAdornment = React.memo(() => (
    <InputAdornment
      position="end"
      data-testid="input-adornment"
      onClick={() =>
        setInputType(inputType === "password" ? "text" : "password")
      }
    >
      {inputType === "password" ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </InputAdornment>
  ));

  return (
    <FormControl variant="standard" fullWidth={fullWidth} error={error} sx={sx}>
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <CustomInput
        id={id}
        type={inputType}
        {...other}
        {...(isPassword && {
          endAdornment: <IconEndAdornment />,
        })}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default Input;
