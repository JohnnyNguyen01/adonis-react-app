import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const Appbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography > Dashboard </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Appbar;