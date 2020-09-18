import React, { useEffect, useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from "@material-ui/core";
import ReactPlayer from "react-player";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(theme => ({
    exerciseCardRoot: {
        marginTop: "30px",
        width: "100%",
        height: theme.spacing(100),
        left: "50%",
    },
    cardContent: {
        margin: "0 auto",
        marginLeft: "20px",
        marginRight: "20px",
        padding: "10px 0"
    },
    table: {
        minWidth: "600px"
    },
}));

function SavedWorkoutDialogueBox(props) {
    const [open, setOpen] = useState(true);
    const workoutName = props.data.workout_name;
    const exercisesList = Object.values(props.data.exercises);
    const classes = useStyles();
    /**
     * Event handler for the close button
     */
    const handleClose = () => setOpen(false);

    const renderExerciseDetails = exercisesList.map(value => {
        return Object.values(value).map((exercise, index) => {
            const setsList = Object.values(exercise.sets);
            console.log(setsList);
            return (
                <Paper
                    key={index}
                    elevation={3}
                    className={classes.exerciseCardRoot}>
                    <div className={classes.cardContent}>
                        <Typography variant="h4">{exercise.exerciseName}</Typography>
                        <Typography variant="h5">{`Exercise Description: ${exercise.description}`}</Typography>
                        <Typography variant="h5">Video</Typography>
                        <ReactPlayer
                            url={exercise.exerciseURL} />
                        <Typography variant="h5">{`type: ${exercise.repType}`}</Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Set #</TableCell>
                                        <TableCell>Reps</TableCell>
                                        <TableCell>RPE</TableCell>
                                        <TableCell>Weight</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {setsList.map((set, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {index}
                                                </TableCell>
                                                <TableCell align="left"> {set.reps}</TableCell>
                                                <TableCell align="left">{set.rpe}</TableCell>
                                                <TableCell align="left">{set.weight}</TableCell>
                                            </TableRow>)
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Paper>);
        })
    });

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth={true}
                maxWidth={"lg"}>
                <DialogTitle id="workout" > {workoutName} Details </DialogTitle>
                <DialogContent>
                    <DialogContentText> Here are the workout details</DialogContentText>
                    {renderExerciseDetails}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default SavedWorkoutDialogueBox

/**
 *  data.exercises structure:
 * {
 *  1: {
 *         description,
        * exerciseName,
        * exerciseURL,
        * repType,
        * sets{1:
        *      {reps:
        *       rpe
        *       weight
        * }
        * }
 *      }
 * }
 *
 */