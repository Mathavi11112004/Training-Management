import { TextField, Typography, InputAdornment } from "@mui/material";
import style from '../../utils/Constant/style'
function ZTextbox(props) {
  return (
    <>
      {props.label && (
        <Typography variant="body1" sx={{ mb: 0.5, ml: 1 }}>
          {props.label}
          {props.required && (
            <span style={{ color: "red", marginLeft: "4px" }}>*</span>
          )}
        </Typography>
      )}
      <TextField
        type={props.type}
        name={props.name}
        className={props.className}
        fullWidth={props.fullWidth || false}
        variant={props.variant}
        value={props.value}
        autoComplete="off"
        onChange={props.onChange}
        size='small'
        inputProps={props.inputProps}
        error={props.error}
        autoFocus={props.autoFocus || ""}
        InputProps={{
          ...props.InputProps,
          startAdornment:
            props.icon && props.iconPosition === "start" ? (
              <InputAdornment position="start">{props.icon}</InputAdornment>
            ) : null,

          endAdornment:
            props.icon && props.iconPosition === "end" ? (
              <InputAdornment position="end">{props.icon}</InputAdornment>
            ) : null,
        }}
        placeholder={props.placeholder}
       
        sx={{
          ...style.textboxborder,
          ...props.sx,   
        }}
      />
      <Typography variant="caption" color="error" sx={{ marginLeft: '10px' }}>
        {props.helperText ? props.helperText : " "}
      </Typography>
    </>
  );
}
export default ZTextbox;
