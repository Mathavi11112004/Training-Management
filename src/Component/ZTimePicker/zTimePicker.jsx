import * as React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField, Typography } from "@mui/material";
import style from '../../utils/Constant/style'
import dayjs from "dayjs";

function ZTimePicker(props) {
  return (
    <>
      {props.label && (
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          {props.label}
          {props.required && (
            <span style={{ color: "red", marginLeft: "4px" }}>*</span>
          )}
        </Typography>
      )}


      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          value={props.value ? dayjs(props.value, "HH:mm") : null}
          onChange={(newValue) => {
            props.onChange({
              target: {
                name: props.name,
                value: newValue ? newValue.format("HH:mm") : ""
              }
            });
          }}
           sx={{
          ...style.textboxborder,
          ...props.sx,  
        }}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true
            }
          }}
          

        />
      </LocalizationProvider>
    </>
  );
}

export default ZTimePicker;