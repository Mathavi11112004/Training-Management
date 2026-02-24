import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

function withRouter(Component) {

    function ComponentWithRouterProp(props) {
        const navigate = useNavigate();
        const params = useParams();
        const location = useLocation();

        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

        return (
            <Component
                {...props} 
                isMobile={isMobile}
                navigate={navigate}
                params={params}
                location={location}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter;
