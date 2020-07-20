import React from "react";
import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red} from "@material-ui/core/colors";
import "./Drawer"

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: "100%",
    },
    paper:{
        width: "40%",
        height: "100%",
        backgroundColor: "#37474f"
    },
    button : {
        marginLeft: 10,
        marginTop: 10,
    },
}));

//TODO: Finish drawer, priority low
const DashDrawer = (props) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Button variant="contained" className={classes.button}>HOME</Button>
            <Button variant="contained" className={classes.button}>WORKOUTS</Button>
            <Button variant="contained" className={classes.button}>USERS</Button>
        </Paper>
    );
}

export default DashDrawer;