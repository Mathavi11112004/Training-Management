import { Typography } from "@mui/material";
import style from '../../utils/Constant/style'

const ZH1 = ({ className, text, color, sx = {} }) => {
  return (
    <Typography
      className={className}
      sx={{
        ...style.h1,
        color: color,
        ...sx,
      }}
    >
      {text}
    </Typography>
  );
};

export default ZH1;