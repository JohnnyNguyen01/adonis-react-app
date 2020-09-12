import React, { useState, useEffect, useContext } from "react";
import DashDrawer from "../common/drawer/Drawer";
import { Grid, Avatar, Typography, Paper } from "@material-ui/core";
import { CurrentClientContext } from "../providers/CurrentClientContext";
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from "react-horizontal-datepicker";
import Firebase from "../../firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: "column",
        '& > *': {
            marginLeft: "20%"
        },
    },
    profileAvatar: {
        marginLeft: "20%",
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    topPaper: {
        paddingLeft: "20%",
        width: theme.spacing(100),
        height: theme.spacing(50)
    },

}));

const UserProfileScreen = (props) => {
    const [selectedDate, setSelecteDate] = useState(new Date());
    const [latestWorkout, setLatestWorkout] = useState({});
    const { currentClient, setCurrentClient } = useContext(CurrentClientContext);
    const classes = useStyles();

    useEffect(() => {

    }, []);

    console.log(latestWorkout);

    return (
        <Grid container direction="column">
            <Grid item container>
                Hello
            <Grid item xs={1} sm={2}>
                    <DashDrawer />
                </Grid>
                <Grid item xs={12} sm={8} className={classes.root}>
                    <Paper id="clientInfo" elevation={6} className={classes.topPaper}>
                        <Avatar
                            alt={`${currentClient.username}`}
                            src={currentClient.url}
                            className={classes.profileAvatar}
                        />
                        <Typography variant="h3" gutterBottom>
                            {currentClient.username}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            {currentClient.email}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Current Goal: {currentClient.userDoc.goal}
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Max Dead: {currentClient.userDoc.maxBench} Kg
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            Max Squat: {currentClient.userDoc.maxSquat} Kg
                        </Typography>
                        <Typography variant="subtitle2" gutterBottom>
                            max Squat: {currentClient.userDoc.maxDead} Kg
                        </Typography>
                    </Paper>
                    <div>
                        <DatePicker getSelectedDay={date => setSelecteDate(date)}
                            endDate={100}
                            selectDate={selectedDate}
                            labelFormat={"MMMM"}
                            color={"red"}
                        />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );

}

export default UserProfileScreen;
