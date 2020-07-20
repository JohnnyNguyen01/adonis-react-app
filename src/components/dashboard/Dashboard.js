import React, { useState, useEffect } from "react";
import Firebase from "../../firebase";
import DashDrawer from "../common/drawer/Drawer";
import { Grid } from "@material-ui/core";
import Appbar from "../common/Appbar/Appbar";
import { TextField, Typography, Avatar, Button } from "@material-ui/core";
import useStyles from "./UseStyles";
import UserTable from "./widgets/UserTable/UserTable";
import firebase from "../../firebase";

const Dashboard = (props) => {
    const classes = useStyles();

    if (Firebase.getCurrentUser == null) {
        console.log(Firebase.auth.currentUser);
        alert("Please log in my guy, don't be a douche");
        props.history.replace('/');
        return null;
    }

    return (
        <Grid container direction="column">
            <Grid item> <Appbar /></Grid>
            <Grid item container>
                <Grid item xs={1} sm={2}> Where the Drawer will be</Grid>
                <Grid item xs={12} sm={8}>
                    <div className={classes.marginTop}>
                        <UserTable/>
                    </div>
                    <div className={classes.marginTop}>
                        <div>
                            <Avatar variant="square" className={classes.square} src="W"/>
                            <Typography>Week 1 Day 1</Typography>
                        </div>
                        <form>
                            <TextField
                                id="filled-multiline-static"
                                label="Coach Instructions"
                                multiline
                                rows={4}
                                defaultValue=""
                                variant="filled"
                                className={classes.textfield}
                            />
                        </form>
                        <Button 
                        className={`${classes.marginTop} ${classes.button}`} 
                        variant="contained"
                        onClick={firebase.getUserList}>Add new Exercise</Button>
                    </div>
                </Grid>
                <Grid item xs={1} sm={2}> Where the footer will be</Grid>
            </Grid>
        </Grid>

    );
}

export default Dashboard;