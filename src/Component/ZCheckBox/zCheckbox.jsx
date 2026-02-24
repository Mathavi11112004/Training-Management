import { FormControl, FormControlLabel, Checkbox, FormHelperText } from "@mui/material";

const ZCheckbox = ({ label, checked, onChange, error, helperText }) => {
  return (
    <FormControl error={!!error} component="fieldset">
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}    
            onChange={onChange}  
            color="primary"
          />
        }
        label={label}
      />
      {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default ZCheckbox;