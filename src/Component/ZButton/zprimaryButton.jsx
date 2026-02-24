import { Button } from "@mui/material"
import style from "../../utils/Constant/style"

const ZPrimaryButton = (props) => {

    return (
        <Button
            className={props.className}
            type="submit"
            variant={props.variant || 'contained'}
            fullWidth={props.fullWidth || false}
            color={props.color || "primary"}
            size={props.size}
            onClick={props.onClick}
            
            // startIcon={props.startIcon}
            disabled={props.disabled || false}
            sx={{...style.primaryButton, textTransform: props.uppercase ? 'uppercase' : 'none', fontWeight: props.fontWeight || 600}}
        >
            {props.label}
        </Button>
    )
}

export default ZPrimaryButton