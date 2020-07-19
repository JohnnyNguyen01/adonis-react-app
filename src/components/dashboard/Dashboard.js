import React, { useState, useEffect } from "react";
import Firebase from "../../firebase";
import DashDrawer from "../common/drawer/Drawer";
import { Grid } from "@material-ui/core";
import Appbar from "../common/Appbar/Appbar";
const Dashboard = (props) => {

    if (Firebase.getCurrentUser == null) {
        console.log(Firebase.auth.currentUser);
        alert("Please log in my guy, don't be a douche");
        props.history.replace('/');
        return null;
    }

    return (
        <Grid container direction="column">
            <Grid item> <Appbar/></Grid>
                <Grid item container>
                    <Grid item xs={0} sm={2}> Where the content will be</Grid>
                    <Grid item xs={12} sm={8}>
                        Where the content will be
                        Where the content will be
                        Where the content will be
                        Where the content will be
                        Where the content will be
                </Grid>
                    <Grid item xs={0} sm={2}> Where the footer will be</Grid>
                </Grid>
            </Grid>

    );
}

export default Dashboard;