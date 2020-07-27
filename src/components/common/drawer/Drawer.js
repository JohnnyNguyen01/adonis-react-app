import React from "react";
import { Paper, Button, Typography, Drawer, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red, grey, blue } from "@material-ui/core/colors";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 240,
        flexShrink: 0,
        display: "flex",
    },
    paper: {
        width: 250,
        height: "100%",
        backgroundColor: "#212121"
    },
    button: {
        marginLeft: 10,
        marginTop: 10,
    },
    icon: {
        backgroundColor: "yellow",
        color: grey[500],
        fontSize: 50,
        display: "inline",
        marginTop: 15
    },
    linkRoot: {
        marginLeft: "30%",
        display: "inline"
    },
    navLink: {
        backgroundColor: "blue",
        paddingBottom: 5,
        color: "#FFFFFF",
        display: "inline",
        textAlign: "center"
    },
    whiteColor: {
        color: "#FFFFFF"
    }
}));


//TODO: Finish drawer, priority low
const DashDrawer = (props) => {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            className={classes.drawer}
        >
            <Paper className={classes.paper}>
                {/* <NavLink to="/editusers">
                    <div className={classes.linkRoot}>
                        <AccountCircleIcon className={classes.icon} />
                        <Typography className={classes.navLink}>Manage Users</Typography>
                    </div>
                </NavLink> */}
                <List>
                <ListItem button key="home" className={classes.whiteColor}>
                        <ListItemIcon><AccountCircleIcon className={classes.whiteColor}/></ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItem>
                    <ListItem button key="userDash" className={classes.whiteColor}>
                        <ListItemIcon><AccountCircleIcon className={classes.whiteColor}/></ListItemIcon>
                        <ListItemText>Manage Users</ListItemText>
                    </ListItem>
                    <ListItem button key="exerciseDash" className={classes.whiteColor}>
                        <ListItemIcon><AccountCircleIcon className={classes.whiteColor}/></ListItemIcon>
                        <ListItemText>Manage Exercises</ListItemText>
                    </ListItem>
                </List>
            </Paper>
        </Drawer>
    );
}

export default DashDrawer;

/*
 *  Home
 *  User Management
 *  Add Remove Exercises
 *  Add remvoe workouts
 */