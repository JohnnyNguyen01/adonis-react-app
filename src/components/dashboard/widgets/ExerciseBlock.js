import React from "react";
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

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 12,
        minWidth: 120,
        width: "70%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textfield: {
        width: "70%",
    },
}));


const ExerciseBlock = () => {
    const classes = useStyles();
    return (
        <Grid container direction="column">
            <Grid item container>
                <Grid item sm={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="outlined-age-native-simple">Exercise</InputLabel>
                        <Select
                            native
                            onChange={null}
                            label="Exercise"
                            inputProps={{
                                name: 'Exercise',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option value={"Squat"}>Back Squat</option>
                            <option value={"Benchpress"}>Benchpress</option>
                            <option value={"Conventional Deadlift"}>Conventional Deadlift</option>
                        </Select>
                    </FormControl>
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
                                        <OutlinedInputLabel/>
                                    </TableCell>
                                    <TableCell>
                                    <OutlinedInputLabel />
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