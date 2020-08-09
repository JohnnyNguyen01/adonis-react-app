import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@material-ui/core";
import OutlinedInputLabel from "../../common/OutlinedInputLabel/OutlinedInputLabel";
import Firebase from "../../../firebase";
import ReactPlayer from "react-player";

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
    marginTop: {
        marginTop: 12,
    }
}));


const ExerciseBlock = (props) => {
    //props.setWorkoutExerciseList()
    const [exerciseList, setExerciseList] = useState([]);
    const [chosenExercise, setChosenExercise] = useState(null);
    const [setsList, setSetsList] = useState([]);
    const [setAmount, setSetAmount] = useState(0);
    const [repType, setRepType] = useState("reps");
    const [clientDoc, setClientDoc] = useState(props.clientDoc);
    const [exerciseNotes, setExerciseNotes] = useState("");
    const [setsObject, setSetsObject] = useState({});
    const [chosenRepScheme, setChosenRepScheme] = useState();
    const [exerciseBlockOutput, setExerciseBlockOutput] = useState({});

    useEffect(() => {
        const getExerciseList = async () => {
            setExerciseList(await Firebase.getExerciseList());
        }
        setSetsList(renderSetsOptions);
        getExerciseList();
        setExerciseBlockOutput({
            ...exerciseBlockOutput,
            exerciseName: chosenExercise != null ? chosenExercise.exerciseName : null,
            exerciseURL: chosenExercise != null ? chosenExercise.exerciseURL : null,
            description: exerciseNotes != null ? exerciseNotes : "",
            repType: chosenRepScheme != null? chosenRepScheme : null,
            sets: setsObject != null ? setsObject : null
        });
    }, [chosenExercise, exerciseNotes, setsObject, chosenRepScheme ]);

    console.log(exerciseBlockOutput);
    
    //mapping of exercise options
    const exerciseOptions = exerciseList.map(
        exercise => ({ value: exercise.exerciseName, label: exercise.exerciseName })
    );

    //mapping of setsList for dropdown
    const setsOptions = setsList.map(
        set => ({ value: set, label: `${set} sets` })
    );

    const repTypeOptions = [{ value: "reps", label: "Reps" }, { value: "secs", label: "Seconds" }];

    //reenderSetsOptions for sets Table
    function renderSetsOptions() {
        var setsList = [];
        for (var i = 1; i < 13; i++) {
            setsList.push(i);
        }
        return setsList;
    }

    const handleExerciseDDonChange = (exerciseName) => {
        exerciseList.forEach((exercise) => {
            if (exercise.exerciseName === exerciseName)
                setChosenExercise(exercise);
        });
    }

    const handleExerciseNotesTF = (stringValue) => {
        setExerciseNotes(stringValue);
    }

    const handleRepsDropDown = (type) => {
        setRepType(type);
        setChosenRepScheme(type);
    }

    //todo: refactor setState
    function renderTableCells() {
        var rowList = []
        for (var i = 1; i <= setAmount; i++) rowList.push(i);
        return rowList.map((set, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>
                        {`Set ${set}`}
                    </TableCell>
                    <TableCell>
                        <TextField
                            type="number"
                            onChange={e => setSetsObject(prevState => (
                                {
                                    ...prevState,
                                    [`${set}`]: {
                                        ...setsObject[`${set}`],
                                        reps: e.target.value
                                    }
                                })
                            )} />
                    </TableCell>
                    <TableCell>
                        <TextField
                            type="number"
                            onChange={e => setSetsObject(prevState => (
                                {
                                    ...prevState,
                                    [`${set}`]: {
                                        ...setsObject[`${set}`],
                                        rpe: e.target.value
                                    }
                                })
                            )} />
                    </TableCell>
                    <TableCell>
                        <TextField
                            type="number"
                            onChange={e => setSetsObject(prevState => (
                                {
                                    ...prevState,
                                    [`${set}`]: {
                                        ...setsObject[`${set}`],
                                        weight: e.target.value
                                    }
                                })
                            )} />
                    </TableCell>
                </TableRow>
            );
        })
    }

    const classes = useStyles();
    return (
        <Grid container direction="column">
            <Grid item container>
                <Grid item sm={6}>
                    <OutlinedInputLabel
                        onChange={event => { handleExerciseDDonChange(event.target.value) }}
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
                            onChange={e => handleExerciseNotesTF(e.target.value)}
                        />
                    </div>
                    {chosenExercise != null ?
                        <div className={classes.marginTop}>
                            <ReactPlayer
                                width="70%"
                                height="70%"
                                url={chosenExercise.exerciseURL} />
                        </div> : null}
                </Grid>
                <Grid item sm={6}>
                    {/* Right Column */}
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <OutlinedInputLabel
                                            onChange={event => { setSetAmount(event.target.value) }}
                                            options={setsOptions}
                                            inputlabel="Sets" />
                                    </TableCell>
                                    <TableCell>
                                        <OutlinedInputLabel
                                            inputlabel="Reps"
                                            options={repTypeOptions}
                                            onChange={event => handleRepsDropDown(event.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell>RPE</TableCell>
                                    <TableCell>Weight (Kg)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderTableCells()}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ExerciseBlock;