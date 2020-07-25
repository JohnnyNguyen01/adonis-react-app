import React from "react";
import Firebase from "../../firebase";
import DashDrawer from "../common/drawer/Drawer";
import { Grid } from "@material-ui/core";
import Appbar from "../common/Appbar/Appbar";
import { TextField, Typography, Avatar, Button } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from "@material-ui/core/styles";
import ExerciseBlock from "./widgets/ExerciseBlock";
import useStyles from "./UseStyles";
import OutlinedInputLabel from "../common/OutlinedInputLabel/OutlinedInputLabel";
class Dashboard extends React.Component {

    state = {
        userDocList: [],
        currentClient: null,
        exerciseBlockList: [],
        selectedDay: 1
    }

    componentDidMount() {
        if (Firebase.getCurrentUser == null) {
            console.log(Firebase.auth.currentUser);
            alert("Please log in my guy, don't be a douche");
            this.props.history.replace('/');
        }
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

    render() {
        console.log(this.state.selectedDay);
        const { classes } = this.props;
        const selectUserOptions = this.state.userDocList.map((doc) => ({
            value: doc.id,
            label: doc.data().username
        }));
        const renderExerciseBlocks = this.state.exerciseBlockList.map((block, index) => {
            return (
                <div className={classes.marginTop}>
                    <ExerciseBlock />
                </div>);
        });
        return (
            <Grid container direction="column">
                <Grid item> <Appbar /></Grid>
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
                                <Typography>Week {this.state.selectedDay} Day 1</Typography>
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
                            <Pagination
                                className={`${classes.marginTop} ${classes.centre}`}
                                count={7}
                                onChange={(event,page) => { this.setState({ selectedDay: page }) }} />
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        )
    };
}

export default withStyles(useStyles)(Dashboard);