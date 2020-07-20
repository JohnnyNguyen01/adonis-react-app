import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

/*
 * Props that change: 
 *  onChange callback
 *  width
 *  label
 *  inputProps
 *  options 
 */

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        width: 70,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const OutlinedInputLabel = (props) => {
    const classes = useStyles();

    return (
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
    );
}

export default OutlinedInputLabel;