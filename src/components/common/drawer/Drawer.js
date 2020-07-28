import React from "react";
import { Paper, Button, Typography, Drawer, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red, grey, blue } from "@material-ui/core/colors";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import HomeIcon from '@material-ui/icons/Home';
import ForumIcon from '@material-ui/icons/Forum';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Firebase from "../../../firebase";

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
    icon: {
        backgroundColor: "yellow",
        color: grey[500],
        fontSize: 50,
        display: "inline",
        marginTop: 15
    },
    whiteColor: {
        color: "#FFFFFF"
    }
}));


//TODO: Finish drawer, priority low
const DashDrawer = (props) => {
    const classes = useStyles();

    function handleSignOut(){
        Firebase.logout();
    }

    return (
        <Drawer
            variant="permanent"
            className={classes.drawer}
        >
            <Paper className={classes.paper}>
                <List>
                    <Link to="/dash">
                        <ListItem button key="home" className={classes.whiteColor}>
                            <ListItemIcon><HomeIcon className={classes.whiteColor} /></ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                    </Link>
                    <Link to="/editusers">
                        <ListItem button key="userDash" className={classes.whiteColor}>
                            <ListItemIcon><AccountCircleIcon className={classes.whiteColor} /></ListItemIcon>
                            <ListItemText>Manage Users</ListItemText>
                        </ListItem>
                    </Link>
                    <ListItem button key="exerciseDash" className={classes.whiteColor}>
                        <ListItemIcon><FitnessCenterIcon className={classes.whiteColor} /></ListItemIcon>
                        <ListItemText>Manage Exercises</ListItemText>
                    </ListItem>
                    <ListItem button key="chatLobby" className={classes.whiteColor}>
                        <ListItemIcon><ForumIcon className={classes.whiteColor} /></ListItemIcon>
                        <ListItemText>Message Clients</ListItemText>
                    </ListItem>
                    <ListItem button key="signout" className={classes.whiteColor}>
                        <Link to="/" onClick={() => handleSignOut()}>
                            <ListItemIcon><ExitToAppIcon className={classes.whiteColor} /></ListItemIcon>
                            <ListItemText>Sign Out</ListItemText>
                        </Link>
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