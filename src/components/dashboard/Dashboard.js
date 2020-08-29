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
import Moment from 'react-moment';
import moment from 'moment';


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
    const [currentExerciseBlockList, setCurrentExerciseBlockList] = useState({ currentBlock: exerciseBlockListDayOne, setMethod: setExerciseBlockListDayOne });
    const [selectedDay, setSelectedDay] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [workoutExerciseListObj, setWorkoutExerciseListObj] = useState({});
    const [allWorkouts, setAllWorkouts] = useState({})
    const [workoutDescription, setWorkoutDescription] = useState("");
    const [exerciseBlockDayDates, setExerciseBlockDayDates] = useState({});
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
        setUpOutputDates();
    }, [startDate, selectedDay, workoutExerciseListObj, exerciseBlockListDayOne, exerciseBlockListDayTwo,
        exerciseBlockListDayThree, exerciseBlockListDayFour, exerciseBlockListDayFive, exerciseBlockListDaySix, exerciseBlockListDaySeven]);


    /**
     *  Increments supplied date weekly by num times
     * @param {Date} startingDate The starting date to increment
     * @param {Number} num The amount of times to increment
     * @return {Array}     An array of all tinfo@myspecialistssydney.com.auhe incremented dates including staring date
     */
    function incrementDateWeeklyBy(startingDate, num) {
        const DatesList = [startingDate];
        var date = startingDate;
        for (var i = 0; i < num; i++) {
            DatesList.push(incrementDateByOneWeek(date));
            date = incrementDateByOneWeek(date);
        }
        return DatesList;
    }

    const getThis = () => {
        var i = exerciseBlockDayDates["1"];
        return i;
    }

    const setUpOutputDates = () => {
        setExerciseBlockDayDates(
            {
                1: incrementDateWeeklyBy(startDate, 10),
                2: incrementDateWeeklyBy(incrementDateByDays(startDate, 1), 12),
                3: incrementDateWeeklyBy(incrementDateByDays(startDate, 2), 12),
                4: incrementDateWeeklyBy(incrementDateByDays(startDate, 3), 12),
                5: incrementDateWeeklyBy(incrementDateByDays(startDate, 4), 12),
                6: incrementDateWeeklyBy(incrementDateByDays(startDate, 5), 12),
                7: incrementDateWeeklyBy(incrementDateByDays(startDate, 6), 12),
            });

    }
    /**
    * Increments the supplied date by 7 days
    * @param {Date} date The date to increment
    * @return {Date}     The return Date 
    */
    function incrementDateByOneWeek(date) {
        return moment(date).add(7, "days")._d;
    }

    /**
    * Increments the supplied date by 7 days
    * @param {Date} date The date to increment
    * @param {Number} number Amount to increment by
    * @return {Date}     The Incremented Date Date 
    */
    function incrementDateByDays(date, number) {
        return moment(date).add(number, "days")._d;
    }

    const setCurrentBlockListToSelectedDay = () => {
        switch (selectedDay) {
            case 1: {
                setCurrentExerciseBlockList({ currentBlock: exerciseBlockListDayOne, setMethod: setExerciseBlockListDayOne });
                setAllWorkouts({ ...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj });
                break;
            }
            case 2: {
                setCurrentExerciseBlockList({ currentBlock: exerciseBlockListDayTwo, setMethod: setExerciseBlockListDayTwo });
                setAllWorkouts({ ...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj });
                break;
            }
            case 3: {
                setCurrentExerciseBlockList({ currentBlock: exerciseBlockListDayThree, setMethod: setExerciseBlockListDayThree });
                setAllWorkouts({ ...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj });
                break;
            }
            case 4: {
                setCurrentExerciseBlockList({ currentBlock: exerciseBlockListDayFour, setMethod: setExerciseBlockListDayFour });
                setAllWorkouts({ ...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj });
                break;
            }
            case 5: {
                setCurrentExerciseBlockList({ currentBlock: exerciseBlockListDayFive, setMethod: setExerciseBlockListDayFive });
                setAllWorkouts({ ...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj });
                break;
            }
            case 6: {
                setCurrentExerciseBlockList({ currentBlock: exerciseBlockListDaySix, setMethod: setExerciseBlockListDaySix });
                setAllWorkouts({ ...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj });
                break;
            }
            case 7: {
                setCurrentExerciseBlockList({ currentBlock: exerciseBlockListDaySeven, setMethod: setExerciseBlockListDaySeven });
                setAllWorkouts({ ...allWorkouts, [`${selectedDay}`]: workoutExerciseListObj });
                break;
            }
            default: {
                setCurrentExerciseBlockList({ currentBlock: exerciseBlockListDayOne, setMethod: setExerciseBlockListDayOne });
                break;
            }
        }

    }

    const handleUserDropDownOnChange = (docID) => {
        userDocList.forEach((document) => {
            if (docID === document.id)
                setCurrentClient(document);
        });
    }

    const handleAddNewExerciseBtn = () => {
        var currentBlock = currentExerciseBlockList.currentBlock;
        currentExerciseBlockList.setMethod([...currentBlock, currentBlock.push(currentBlock.length + 1)]);
    }

    const handleStartDateChange = (date) => setStartDate(date)

    const handleSubmitButton = async () => {
        //let clientDoc = currentClient.data();
        var latestWorkout = await Firebase.getLatestWorkoutForUser(currentClient.id);
        if (latestWorkout != null) {
            await latestWorkout.ref.update({ repeat: false });
        }
        let coachID = userContext.currentUser.uid;
        var docRefID = await Firebase.createNewWorkoutDoc(coachID, currentClient.id, startDate, workoutDescription);
        Firebase.addExerciseToNewWorkoutDoc(docRefID, allWorkouts, exerciseBlockDayDates);
    }

    const selectUserOptions = userDocList.map((doc) => ({
        value: doc.id,
        label: doc.data().username
    }));

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
                                onChange={(event) => setWorkoutDescription(event.target.value)}
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

