import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextField } from "@material-ui/core";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@material-ui/core";
import OutlinedInputLabel from "../../common/OutlinedInputLabel/OutlinedInputLabel";
import Firebase from "../../../firebase";

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 12,
        minWidth: 120,
        width: "100%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textfield: {
        width: "70%",
    },
}));


const ExerciseBlock = () => {
    const [exerciseList, setExerciseList] = useState([]);
    const [chosenExercise, setChosenExercise] = useState("");
    const [setsList, setSetsList] = useState([]);
    const[setAmount, setSetAmount] = useState(0);
    const [repType, setRepType] = useState("reps");

    useEffect(() => {
        const getExerciseList = async () => {
            setExerciseList(await Firebase.getExerciseList());
        }
        setSetsList(renderSetsOptions);
        getExerciseList();
    }, []);

    const exerciseOptions = exerciseList.map(
        exercise => ({ value: exercise.exerciseName, label: exercise.exerciseName })
    );

    const setsOptions = setsList.map(
        set => ({value: set, label: `${set} sets`})
    );

    const repTypeOptions = [{value: "reps", label: "Reps"}, {value: "secs", label: "Seconds"}];

    function renderSetsOptions() {
        var setsList = [];
        for (var i = 1; i < 13; i++) {
            setsList.push(i);
        }
        return setsList;
    }
    console.log(repType);
    const classes = useStyles();
    return (
        <Grid container direction="column">
            <Grid item container>
                <Grid item sm={6}>
                    <OutlinedInputLabel
                        onChange={event => { setChosenExercise(event.target.value) }}
                        options={exerciseOptions}
                        inputlabel="Exercises"
                        classes={classes}
                    />
                    <div>
                        <TextField
                            id="filled-multiline-static"
                            label="Exercise Notes"
                            multiline
                            rows={4}
                            defaultValue=""
                            variant="filled"
                            className={classes.textfield}
                        />
                    </div>
                </Grid>
                <Grid item sm={6}>
                    {/* Right Column */}
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <OutlinedInputLabel 
                                        onChange={ event => {setSetAmount(event.target.value)}}
                                        options={setsOptions}
                                        inputlabel="Sets"/>
                                    </TableCell>
                                    <TableCell>
                                        <OutlinedInputLabel
                                        inputlabel="Reps" 
                                        options={repTypeOptions}
                                        onChange={event => setRepType(event.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>RPE</TableCell>
                                    <TableCell>Weight (Kg)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ExerciseBlock;