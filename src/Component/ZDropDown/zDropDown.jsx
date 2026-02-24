import { FormControl, MenuItem, Select, Typography, Checkbox, ListItemText } from "@mui/material";
import style from '../../utils/Constant/style'

function ZDropdown(props) {
  const isMultiple = props.multiple || false;

    const getLabels = (selected) => {
        if (!selected || selected.length === 0)
            return <span style={{ color: "#999" }}>--Select--</span>;

        const labels = props.options
            ?.filter(opt => selected.includes(opt.value))   
            .map(opt => opt.label);                       

        return labels.join(", ");
    };

    const getLabel = (selected) => {
        if (!selected)
            return <span style={{ color: "#999" }}>--Select--</span>;

        const option = props.options.find(opt => opt.value === selected);
        return option ? option.label : "";
    };

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

            <FormControl
                fullWidth
                
                required={props.required || false}
                sx={style.textboxborder}
                size="small"
            >
                <Select
                    multiple={isMultiple}
                    value={props.value}
                    name={props.name} 
                    onChange={props.onChange}
                    displayEmpty
                    renderValue={(selected) =>
                        isMultiple ? getLabels(selected) : getLabel(selected)
                    }
                    sx={style.textboxborder}
                >
                    {!isMultiple && (
                        <MenuItem value="">
                            <span style={{ color: "#999" }}>--Select--</span>
                        </MenuItem>
                    )}

                    {props.options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {isMultiple && (
                                <Checkbox checked={props.value.includes(option.value)} />
                            )}
                            <ListItemText primary={option.label} />
                        </MenuItem>
                    ))}
                </Select>

                <Typography variant="caption" color="error" sx={{marginLeft : '10px'}}>
                    {props.helperText || " "} 
                </Typography>
            </FormControl>
        </>
    );
}

export default ZDropdown;
