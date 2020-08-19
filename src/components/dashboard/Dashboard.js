import React, { useState, useEffect, useContext } from "react";
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
import { UserContext } from "../providers/UserContext";

const Dashboard = ({ history }) => {
    const [userDocList, setUserDocList] = useState([]);
    const [currentClient, setCurrentClient] = useState(null);
    const [exerciseBlockListDayOne, setExerciseBlockListDayOne] = useState([]);
    const [exerciseBlockListDayTwo, setExerciseBlockListDayTwo] = useState([]);
    const [exerciseBlockListDayThree, setExerciseBlockListDayThree] = useState([]);
    const [exerciseBlockListDayFour, setExerciseBlockListDayFour] = useState([]);
    const [exerciseBlockListDayFive, setExerciseBlockListDayFive] = useState([]);
    const [exerciseBlockListDaySix, setExerciseBlockListDaySix] = useState([]);
    const [exerciseBlockListDaySeven, setExerciseBlockListDaySeven] = useState([]);
    const [currentExerciseBlockList, setCurrentExerciseBlockList] = useState({currentBlock:exerciseBlockListDayOne, setMethod: setExerciseBlockListDayOne});
    const [selectedDay, setSelectedDay] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [cycleLength, setCycleLength] = useState(0);
    const [workoutExerciseListObj, setWorkoutExerciseListObj] = useState({});
    const [allWorkouts, setAllWorkouts] = useState({})
    const [workoutDescription, setWorkoutDescription] = useState("");
    const userContext = useContext(UserContext);
    const classes = useStyles();

    useEffect(() => {
        //todo: un-comment below upon deployment
        // if (userContext.currentUser === null) {
        //     alert("please login before accessing this page");
        //     history.replace("/");
        // }
        const fetchUsers = async () => {
            setUserDocList(await Firebase.getUserListAsDoc());
        }
        if (userDocList.length === 0) fetchUsers();
        setCurrentBlockListToSelectedDay();
    }, [selectedDay, workoutExerciseListObj ,exerciseBlockListDayOne,exerciseBlockListDayTwo, exerciseBlockListDayThree, exerciseBlockListDayFour, exerciseBlockListDayFive, exerciseBlockListDaySix, exerciseBlockListDaySeven ]);
    
    console.log(allWorkouts);

    const setCurrentBlockListToSelectedDay = () => {
        switch(selectedDay){
            case 1: {
                setCurrentExerciseBlockList({currentBlock:exerciseBlockListDayOne, setMethod: setExerciseBlockListDayOne});
                setAllWorkouts({...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj });
                break;
            }
            case 2: {
                setCurrentExerciseBlockList({currentBlock:exerciseBlockListDayTwo, setMethod: setExerciseBlockListDayTwo});
                setAllWorkouts({...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj});
                break;
            }
            case 3: {
                setCurrentExerciseBlockList({currentBlock:exerciseBlockListDayThree, setMethod: setExerciseBlockListDayThree});
                setAllWorkouts({...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj});
                break;
            }
            case 4: {
                setCurrentExerciseBlockList({currentBlock:exerciseBlockListDayFour, setMethod: setExerciseBlockListDayFour});
                setAllWorkouts({...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj});
                break;
            }
            case 5: {
                setCurrentExerciseBlockList({currentBlock:exerciseBlockListDayFive, setMethod: setExerciseBlockListDayFive});
                setAllWorkouts({...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj});
                break;
            }
            case 6: {
                setCurrentExerciseBlockList({currentBlock:exerciseBlockListDaySix, setMethod: setExerciseBlockListDaySix});
                setAllWorkouts({...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj});
                break;
            }
            case 7: {
                setCurrentExerciseBlockList({currentBlock:exerciseBlockListDaySeven, setMethod: setExerciseBlockListDaySeven});
                setAllWorkouts({...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj});
                break;
            }
            default: {
                setCurrentExerciseBlockList({currentBlock:exerciseBlockListDayOne, setMethod: setExerciseBlockListDayOne});
                break;
            }
        }

        // if (selectedDay === 1) 
        // else if (selectedDay === 2) setCurrentExerciseBlockList({currentBlock: exerciseBlockListDayTwo, setMethod:  setExerciseBlockListDayTwo})
        // else if (selectedDay === 3) setCurrentExerciseBlockList({currentBlock:exerciseBlockListDayThree, setMethod: setExerciseBlockListDayThree})
        // else if (selectedDay === 4) setCurrentExerciseBlockList({currentBlock:exerciseBlockListDayFour, setMethod: setExerciseBlockListDayFour})
        // else if (selectedDay === 5) setCurrentExerciseBlockList({currentBlock:exerciseBlockListDayFive, setMethod: setExerciseBlockListDayFive})
        // else if (selectedDay === 6) setCurrentExerciseBlockList({currentBlock:exerciseBlockListDaySix, setMethod: setExerciseBlockListDaySix})
        // else if (selectedDay === 7) setCurrentExerciseBlockList({currentBlock:exerciseBlockListDaySeven, setMethod: setExerciseBlockListDaySeven});
    }

    const handleUserDropDownOnChange = (docID) => {
        userDocList.forEach((document) => {
            if (docID === document.id)
                setCurrentClient(document);
        });
    }

    const handleAddNewExerciseBtn = () => {
        //setExerciseBlockListDayOne(exerciseBlockListDayOne.concat(exerciseBlockListDayOne.length + 1));
        var currentBlock = currentExerciseBlockList.currentBlock;
        currentExerciseBlockList.setMethod([...currentBlock, currentBlock.push(currentBlock.length + 1)]);
        console.log( currentExerciseBlockList.currentBlock);
    }

    const handleStartDateChange = (date) => setStartDate(date)

    const handleCycleLengthTFChange = (num) => setCycleLength(num);

    const handleSubmitButton = async () => {
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
        let clientDoc = currentClient.data();
        var latestWorkout = await Firebase.getLatestWorkoutForUser(currentClient.id);
        console.log(latestWorkout.data());
        if (latestWorkout != null) {
            await latestWorkout.ref.update({ repeat: false });
        }
        let coachID = userContext.currentUser.uid;
        Firebase.createNewWorkoutDoc(coachID, currentClient.id, startDate, workoutDescription);
    }

    const selectUserOptions = userDocList.map((doc) => ({
        value: doc.id,
        label: doc.data().username
    }));

    /*
     * 1. On new page, create new exercise blocks 
     * 2. Assign Exercise Block output to a day -> Day: {dates array, day number, exercises{}: exerciseBlockOutput}
     */

    const renderExerciseBlocks = currentExerciseBlockList.currentBlock.map((block, index) => {
        return (
            <div className={`${classes.marginTop}`} key={index}>
                <div>
                    <Typography>Exercise {block}</Typography>
                </div>
                <ExerciseBlock
                    exerciseNumber={block}
                    clientDoc={currentClient}
                    setWorkoutExerciseListHook={setWorkoutExerciseListObj}
                    workoutExerciseList={workoutExerciseListObj} />
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
                                onChange={(event)=> setWorkoutDescription(event.target.value)}
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
                            onChange={(event, page) => { setSelectedDay(page) }} />
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Dashboard;

