import { Button } from "@mui/material"
import style from "../../utils/Constant/style"
const ZIconButton = (props) => {
   // return (
        <Button
            className={props.className}
            type="button"
            variant={props.variant || 'outlined'}
            fullWidth={props.fullWidth || false}
            color={props.color || "primary"}
            size={props.size}
            onClick={props.onClick}
            startIcon={props.startIcon}
            endIcon = {props.endIcon}
            disabled={props.disabled || false}
            // sx={{
            //     textTransform: 'none',
            //     ...props.sx
            // }}
            sx={style.button}
        >
            {props.label}
        </Button>
   // )
}
export default ZIconButton