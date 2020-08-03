import React from "react";
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

class Dashboard extends React.Component {

    state = {
        userDocList: [],
        currentClient: null,
        exerciseBlockList: [],
        selectedDay: 1,
        startDate: new Date(),
        cycleLength: 0,
    }

    componentDidMount() {
        Firebase.getCurrentUser().then((value) => {
            if (value === null) {
                alert("Please log in before accessing this page");
                this.props.history.replace("/");
            }
        });
        const fetchUsers = async () => {
            this.setState({ userDocList: await Firebase.getUserListAsDoc() });
        }
        fetchUsers();
    }

    handleUserDropDownOnChange(docID) {
        this.state.userDocList.forEach((document) => {
            if (docID === document.id)
                this.setState({ currentClient: document });
        });
    }

    handleAddNewExerciseBtn = () => {
        this.setState(prevState => {
            var newElement = prevState.exerciseBlockList.length;
            return { exerciseBlockList: prevState.exerciseBlockList.concat(newElement) }
        })
    }

    handleStartDateChange = (date) => this.setState({ startDate: date })

    handleCycleLengthTFChange = (num) => this.setState({ cycleLength: num });

    handleSubmitButton = () => {
        let clientDoc = this.state.currentClient;
        let clientData = clientDoc.data();
        //console.log(clientDoc.id);
        Firebase.createNewWorkoutDoc(null, null, null, clientDoc.id);
    }

    render() {
        const { classes } = this.props;
        const selectUserOptions = this.state.userDocList.map((doc) => ({
            value: doc.id,
            label: doc.data().username
        }));
        const renderExerciseBlocks = this.state.exerciseBlockList.map((block, index) => {
            return (
                <div className={`${classes.marginTop}`}>
                    <div>
                        <Typography>Exercise {index + 1}</Typography>
                    </div>
                    <ExerciseBlock clientDoc={this.state.currentClient} />
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
                                onChange={(event) => this.handleUserDropDownOnChange(event.target.value)}
                            />
                        </div>
                        <div>
                            <Typography variant="h6">Workout Start to End Dates: </Typography>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    style={{ marginRight: 5 }}
                                    label="Start Date"
                                    value={this.state.startDate}
                                    onChange={(date) => { this.handleStartDateChange(date) }} />
                            </MuiPickersUtilsProvider>
                            <TextField
                                onChange={(e) => this.handleCycleLengthTFChange(e.target.value)}
                                style={{ marginLeft: 5 }}
                                placeholder={this.state.cycleLength.toString()}
                                label="Microcycle length" />
                        </div>
                        <div className={classes.marginTop}>
                            <div>
                                <Avatar
                                    variant="square"
                                    className={classes.square}
                                    src={this.state.currentClient != null ?
                                        this.state.currentClient.data().image_url : null} />
                                <Typography>{this.state.currentClient != null ?
                                    this.state.currentClient.data().username : null}
                                </Typography>
                                <Typography>Day {this.state.selectedDay}</Typography>
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
                                onClick={() => this.handleAddNewExerciseBtn()}>Add new Exercise
                            </Button>
                            <Button
                                onClick={() => this.handleSubmitButton()}
                                variant="contained"
                                className={`${classes.marginTop} ${classes.button}`}
                                style={{ backgroundColor: "LimeGreen", marginLeft: 12 }}>
                                Publish Workout
                            </Button>
                            <Pagination
                                className={`${classes.marginTop} ${classes.centre}`}
                                count={7}
                                onChange={(event, page) => { this.setState({ selectedDay: page }) }} />
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        )
    };
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