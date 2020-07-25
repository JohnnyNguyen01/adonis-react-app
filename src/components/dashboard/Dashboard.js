import React, { useState, useEffect } from "react";
import Firebase from "../../firebase";
import DashDrawer from "../common/drawer/Drawer";
import { Grid } from "@material-ui/core";
import Appbar from "../common/Appbar/Appbar";
import { TextField, Typography, Avatar, Button } from "@material-ui/core";
import useStyles from "./UseStyles";
import ExerciseBlock from "./widgets/ExerciseBlock";
import OutlinedInputLabel from "../common/OutlinedInputLabel/OutlinedInputLabel";

const Dashboard = (props) => {
    const classes = useStyles();
    const [userDocList, setUserDocList] = useState([]);
    const [currentClient, setCurrentClient] = useState(null);
    const [exerciseBlockList, setExerciseBlockList] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            setUserDocList(await Firebase.getUserListAsDoc());
        }
        fetchUsers();
    }, []);

    const userDropdownOptions = userDocList.map((doc) => ({
        value: doc.id,
        label: doc.data().username
    }));

    const handleUserDropDownOnChange = (docID) => {
        userDocList.forEach((document) => {
            if (docID === document.id) setCurrentClient(document);
        });
    }

    console.log(exerciseBlockList);

    const handleAddNewExerciseBtn = () => {
        setExerciseBlockList(exerciseBlockList.concat(ExerciseBlock));
    }

    const renderExerciseBlocks = 
    exerciseBlockList.map((exerciseBlock, index) => {
        return(
        <div key={index} className={classes.marginTop}>
            {exerciseBlock()}
        </div>)
    });

    if (Firebase.getCurrentUser == null) {
        console.log(Firebase.auth.currentUser);
        alert("Please log in my guy, don't be a douche");
        props.history.replace('/');
        return null;
    }

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
                            options={userDropdownOptions}
                            onChange={(event) => handleUserDropDownOnChange(event.target.value)}
                        />
                    </div>
                    <div className={classes.marginTop}>
                        <div>
                            <Avatar 
                            variant="square" 
                            className={classes.square} 
                            src={currentClient != null? currentClient.data().image_url : null} />
                            <Typography>{currentClient!= null ? currentClient.data().username : null}</Typography>
                            <Typography>Week 1 Day 1</Typography>
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
                            onClick={()=> handleAddNewExerciseBtn()}>Add new Exercise
                        </Button>
                    </div>
                </Grid>
                <Grid item xs={1} sm={2}> Where the footer will be</Grid>
            </Grid>
        </Grid>

    );
}

export default Dashboard;