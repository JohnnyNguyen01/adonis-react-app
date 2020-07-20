import React from "react";
import { TextField, Typography, Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red, white } from '@material-ui/core/colors';
const useStyles = makeStyles((theme) => ({
    textfield: {
        width: "80%"
    },
    square: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    heading: {
        display: "inline"
    },
    marginTop: {
        marginTop: "30px"
    },
    button: {
        width: "400px",
        textAlign: "left",
        backgroundColor: red[500],
        color: "#FFFFFF"
    }
}));

const NewWorkoutHeader = () => {
    const classes = useStyles();

    return (
        <div>
            <div>
                <Avatar variant="square" className={classes.square} />
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
            <Button className={`${classes.marginTop} ${classes.button}`} variant="contained">Add new Exercise</Button>
        </div>
    );
}

export default NewWorkoutHeader;