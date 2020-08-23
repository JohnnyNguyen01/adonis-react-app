import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import DashDrawer from "../common/drawer/Drawer";
import MaterialTable from 'material-table';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Firebase from "../../firebase";

const ManageExercisesScreen = ({ history }) => {

    const[exerciseList, setExerciseList] = useState({});

    useEffect(() => {
        const getExercises = async () => {
            setExerciseList(await Firebase.getExerciseList());
        }
        getExercises();
    }, []);
     
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
                                onClick: (event, rowData) => {console.log(event.target.value)}
                            }
                        ]}
                        data={Object.values(exerciseList)}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ManageExercisesScreen;