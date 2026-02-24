import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const ZDatePicker = ({ value, onChange, label, fullWidth, required }) => {

  const renderLabel = label ? (
    <Typography variant="body1" sx={{ mb: 0.5, ml: 1 }}>
      {label}
      {required && (
        <span style={{ color: "red", marginLeft: "4px" }}>*</span>
      )}
    </Typography>
  ) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={renderLabel || "Select Date"}
        value={value ? new Date(value) : null}
        onChange={(date) =>
          onChange(date ? date.toISOString().split("T")[0] : "")
        }
        renderInput={(params) => <TextField {...params} fullWidth={fullWidth} />}
      />
    </LocalizationProvider>
  );
};

export default ZDatePicker;