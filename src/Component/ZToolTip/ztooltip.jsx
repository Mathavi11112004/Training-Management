import { Tooltip } from '@mui/material'
import React from 'react'
import style from '../../utils/Constant/style'

const ZTooltip = ({ children, title, placement, sx={} }) => {

  return (
    <Tooltip
        arrow
        title = {title}
        placement = {placement}
        slotProps={{
            tooltip: {
                sx: {
                    ...style.tooltip,
                    ...sx
                }
            }
        }}
    >
        {children}
    </Tooltip>
  )
}

export default ZTooltip