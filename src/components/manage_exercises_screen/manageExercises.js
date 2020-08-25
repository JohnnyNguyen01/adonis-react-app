import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, TextField, Snackbar } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import DashDrawer from "../common/drawer/Drawer";
import MaterialTable from 'material-table';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Firebase from "../../firebase";
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    addButton: {
        backgroundColor: green[400],
        alignItems: "right",
        color: "#FFFFFF"
    },
    marginTop: {
        marginTop: "20px"
    },
}));

const ManageExercisesScreen = ({ history }) => {
    const classes = useStyles();
    const [exerciseList, setExerciseList] = useState({});
    const [exerciseName, setExerciseName] = useState(null);
    const [exerciseURL, setExerciseURL] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const getExercises = async () => {
            setExerciseList(await Firebase.getExerciseList());
        }
        getExercises();
    }, [exerciseList]);

    const handleClose = () => {
        setShowAlert(false);
    }

    const handleAddExerciseButton = () => {
        if (exerciseName != null && exerciseURL != null) {
            Firebase.addNewExerciseToDB(exerciseName, exerciseURL);
            setExerciseName(null);
            setExerciseURL(null);
        } else {
            setShowAlert(true);
        }
    }

    return (
        <Grid container direction="column">
            <Grid item container>
                <Grid item xs={1} sm={2}>
                    <DashDrawer />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <MaterialTable
                        title="Manage Exercise Database"
                        columns={[
                            { title: "Exercise Name", field: "exerciseName" },
                            { title: "Video URL Link", field: "exerciseURL" }
                        ]}
                        actions={[
                            {
                                icon: DeleteOutlineIcon,
                                tooltip: "Delete Exercise",
                                onClick: (event, rowData) => { console.log(rowData) }
                            }
                        ]}
                        data={Object.values(exerciseList)}
                    />
                    <Typography
                        className={classes.marginTop}
                        variant="h6">
                        Add a new Exercise
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center">
                        <Grid item xs={6} sm={3} container>
                            <TextField
                                label="Exercise Name"
                                value={exerciseName || ""}
                                onChange={(e) => { setExerciseName(e.target.value) }}>

                            </TextField>
                        </Grid>
                        <Grid item xs={6} sm={3} container>
                            <TextField
                                label="Exercise URL"
                                fullWidth
                                value={exerciseURL || ""}
                                onChange={(e) => { setExerciseURL(e.target.value) }}/>

                        </Grid>
                    </Grid>
                    <Grid item container className={classes.marginTop}>
                        <Button
                            classes={classes.addButton}
                            color="primary"
                            variant="contained"
                            onClick={handleAddExerciseButton}>
                            Add Exercise
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={showAlert} autoHideDuration={5000} onClose={handleClose}>
                <Alert severity="error" variant="filled" onClose={handleClose}>
                    Please enter a valid exercise name and url.
                </Alert>
            </Snackbar>
        </Grid>
    );
}

export default ManageExercisesScreen;