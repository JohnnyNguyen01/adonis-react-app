import React, { useState, useEffect } from "react";
import Firebase from "../../firebase";
import DashDrawer from "../common/drawer/Drawer";
import { Grid } from "@material-ui/core";
import { TextField, Typography, Avatar, Button } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from "@material-ui/core/styles";
import ExerciseBlock from "./widgets/ExerciseBlock";
import useStyles from "./UseStyles";
import OutlinedInputLabel from "../common/OutlinedInputLabel/OutlinedInputLabel";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"

const Dashboard = () => {
    const [userDocList, setUserDocList] = useState([]);
    const [currentClient, setCurrentClient] = useState(null);
    const [exerciseBlockList, setExerciseBlockList] = useState([]);
    const [selectedDay, setSelectedDay] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [cycleLength, setCycleLength] = useState(0);

    const classes = useStyles();

    useEffect(() => {
        const fetchUsers = async () => {
            setUserDocList(await Firebase.getUserListAsDoc() );
        }
        fetchUsers();
    },[]);

    const handleUserDropDownOnChange = (docID) => {
        userDocList.forEach((document) => {
            if (docID === document.id)
                setCurrentClient(document );
        });
    }

    const handleAddNewExerciseBtn = () => {
        // this.setState(prevState => {
        //     var newElement = prevState.exerciseBlockList.length;
        //     return { exerciseBlockList: prevState.exerciseBlockList.concat(newElement) }
        // })
        var currentLength = cycleLength;
        setExerciseBlockList( currentLength + 1 );
    }

    const handleStartDateChange = (date) => setStartDate( date )

    const handleCycleLengthTFChange = (num) => setCycleLength(  num );

    const handleSubmitButton = () => {
        let clientDoc = currentClient;
        //let clientData = clientDoc.data();
        //console.log(clientDoc.id);
        Firebase.createNewWorkoutDoc(null, null, null, clientDoc.id);
    }

    console.log(userDocList);
     const selectUserOptions = userDocList.map((doc) => ({
        value: doc.id,
        label: doc.data().username
    }));

    const renderExerciseBlocks = exerciseBlockList.map((block, index) => {
        return (
            <div className={`${classes.marginTop}`}>
                <div>
                    <Typography>Exercise {index + 1}</Typography>
                </div>
                <ExerciseBlock clientDoc={currentClient} />
            </div>);
    });

    return (
        <Grid container direction="column">
            <Grid item container>
                <Grid item xs={1} sm={2}>
                    <DashDrawer />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <div className={classes.marginTop}>
                        <Typography>Select User: </Typography>
                        <OutlinedInputLabel
                            inputLabel="User"
                            options={selectUserOptions}
                            onChange={(event) => handleUserDropDownOnChange(event.target.value)}
                        />
                    </div>
                    <div>
                        <Typography variant="h6">Workout Start to End Dates: </Typography>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                style={{ marginRight: 5 }}
                                label="Start Date"
                                value={startDate}
                                onChange={(date) => { handleStartDateChange(date) }} />
                        </MuiPickersUtilsProvider>
                        <TextField
                            onChange={(e) => handleCycleLengthTFChange(e.target.value)}
                            style={{ marginLeft: 5 }}
                            placeholder={cycleLength.toString()}
                            label="Microcycle length" />
                    </div>
                    <div className={classes.marginTop}>
                        <div>
                            <Avatar
                                variant="square"
                                className={classes.square}
                                src={currentClient != null ?
                                    currentClient.data().image_url : null} />
                            <Typography>{currentClient != null ?
                                currentClient.data().username : null}
                            </Typography>
                            <Typography>Day {selectedDay}</Typography>
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
                        {renderExerciseBlocks}
                        <Button
                            className={`${classes.marginTop} ${classes.button}`}
                            variant="contained"
                            onClick={() => handleAddNewExerciseBtn()}>Add new Exercise
                            </Button>
                        <Button
                            onClick={() => handleSubmitButton()}
                            variant="contained"
                            className={`${classes.marginTop} ${classes.button}`}
                            style={{ backgroundColor: "LimeGreen", marginLeft: 12 }}>
                            Publish Workout
                            </Button>
                        <Pagination
                            className={`${classes.marginTop} ${classes.centre}`}
                            count={7}
                            onChange={(event, page) => { setSelectedDay( page ) }} />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default withStyles(useStyles)(Dashboard);

/*
 * handleAddExerciseBtn:
 *  1. check if the current/latest workout exists.
 *  exists ? set it's repeat boolean to false
 *
 *  2. create new workout document: UID, Date Created, coachID, startDate,
 *  repeat true
 *
 *  3.Add Each Exercise into a new day Doc for the "Days" collection
 *   set dates for only that week
 *
 */