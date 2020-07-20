import { makeStyles } from "@material-ui/core/styles";
import { red, white } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    textfield: {
        width: "80%"
    },
    square: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    heading: {
        display: "inline"
    },
    marginTop: {
        marginTop: "30px"
    },
    button: {
        width: "400px",
        textAlign: "left",
        backgroundColor: red[500],
        color: "#FFFFFF"
    }
}));

export default useStyles;