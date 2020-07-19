import React from "react";
import { Drawer } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import {Typography} from "@material-ui/core";
import "./Drawer"

//TODO: Finish drawer, priority low
const DashDrawer = (props) => {
    return (
        <Paper className="drawer">
            <Drawer
                className="drawer"
                variant="permanent"
                anchor="left"
                open={true}>
                <div>
                    <Typography variant="h6">Drawer</Typography>
                </div>
            </Drawer>
        </Paper>
    );
}

export default DashDrawer;