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
 *  inputlabel
 *  options Array{label, value}
 */

const useStyles = makeStyles((theme) => ({
    formControl: {
        marginBottom: 12,
        minWidth: 120,
        width: "70%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



const OutlinedInputLabel = (props) => {
    const classes = useStyles();

    const renderedOptions = props.options!= null? props.options.map(
        (option, index) => {
            return(
            <option key={index} value={option.value}>{option.label}</option>);
        }
    ) : null;

    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">{props.inputlabel}</InputLabel>
            <Select
                native
                onChange={props.onChange}
                inputlabel={props.inputLabel}
                inputProps={{
                    name: 'Exercise',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
                {renderedOptions}
            </Select>
        </FormControl>
    );
}

export default OutlinedInputLabel;