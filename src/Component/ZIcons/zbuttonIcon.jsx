import { IconButton, Tooltip } from '@mui/material'
import style from '../../utils/Constant/style'

const ZButtonIcon = ({ icon, onClick, active, disabled, size, sx = {}, title, placement, }) => {
    return (
        <Tooltip
            arrow
            title = {title}
            placement = {placement || 'top'}
        >
            <IconButton
                onClick={onClick}
                disabled={disabled}
                size={size || 'medium'}
                sx={{
                    ...style.buttonIcon(active),
                    ...sx
                }}
            >
                {icon}
            </IconButton>
        </Tooltip>
    )
}

export default ZButtonIcon