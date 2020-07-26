import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red, grey } from "@material-ui/core/colors";
import "./Drawer"
import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: "100%",
    },
    paper: {
        width: "40%",
        height: "100%",
        backgroundColor: "#212121"
    },
    button: {
        marginLeft: 10,
        marginTop: 10,
    },
    icon: {
        color: grey[500],
        fontSize: 50,
    },
    linkRoot: {
        marginTip: 15,
        marginLeft: "30%",
    },
    navLink: {
        color: "#FFFFFF"
    }
}));


//TODO: Finish drawer, priority low
const DashDrawer = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Button variant="contained" className={classes.button}>HOME</Button>
            <Button variant="contained" className={classes.button}>WORKOUTS</Button>
            <NavLink to="/editusers">
                <div className={classes.linkRoot}>
                    <AccountCircleIcon className={classes.icon} />
                    <Typography className={classes.navLink}>Manage Users</Typography>
                </div>
            </NavLink>
        </Paper>
    );
}

export default DashDrawer;