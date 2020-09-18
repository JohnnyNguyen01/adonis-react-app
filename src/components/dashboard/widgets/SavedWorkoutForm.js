import { makeStyles } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../providers/UserContext";
import Firebase from "../../../firebase";
import { DateTimePicker } from "@material-ui/pickers";
import { PageviewOutlined } from "@material-ui/icons";
import SavedWorkoutDialogueBox from "./SavedWorkoutDialogueBox";
import { render } from "@testing-library/react";

const useStyles = makeStyles(() => ({
    root: {
        marginTop: "20px",
        marginBottom: "20px",
    }
}));

const SavedWorkoutForm = props => {
    let currentUser = useContext(UserContext);
    const [savedWorkoutList, setSavedWorkoutList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const getSavedWorkoutList = async () => {
            const workoutSnapshots = await Firebase.getAllSavedWorkouts();
            const tableData = workoutSnapshots.map(snapshot => snapshot.data())
            setSavedWorkoutList(tableData);
        }
        getSavedWorkoutList()
    }, []);

    return (
        <div className={classes.root}>
            <MaterialTable
                title="Saved Workouts"
                columns={[
                    { title: "Workout Name", field: "workout_name" },
                    { title: "Created By", field: "coach_id" },
                    { title: "Workout ID", field: "workout_id" }
                ]}
                actions={[
                    {icon : PageviewOutlined,
                    tooltip: "View and edit the workout template",
                    onClick: (event, workoutData) => {
                        render(<SavedWorkoutDialogueBox data={workoutData}/>)}}
                ]}
                data={savedWorkoutList}
            />
        </div>);
}

export default SavedWorkoutForm;

//todoss
/**
 * todo1: When user clicks on table row, open dialogue box showing workout details 
 *  1. on action click => even handler called (Creates new SavedWorkoutDialogBox)
 *  2.
 * 
 */