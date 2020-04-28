import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { useToolbarStyles} from "../style";

const EnhancedTableToolbar = () => {
    const classes = useToolbarStyles();

    return (
        <Toolbar>
            <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                My Tools (0)
        </Typography>
        </Toolbar>
    );
}
export default EnhancedTableToolbar;