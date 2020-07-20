import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const userStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: "#102027",
    },
}));

const Appbar = () => {
    const classes = userStyles();
    return (
        <AppBar position="static" className={classes.appbar}>
            <Toolbar>
                <Typography > Dashboard </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Appbar;