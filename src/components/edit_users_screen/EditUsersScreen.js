import React from "react";
import {Grid} from "@material-ui/core";
import Appbar from "../common/Appbar/Appbar";
import DashDrawer from "../common/drawer/Drawer";
import UserTable from "./UserTable/UserTable";

const EditUserScreen = () => {

    return (
        <Grid container direction="column">
            <Grid item> <Appbar /></Grid>
            <Grid item container>
                <Grid item xs={1} sm={2}>
                    <DashDrawer />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <UserTable/>
                </Grid>
            </Grid>
        </Grid>
    )
};


export default EditUserScreen;