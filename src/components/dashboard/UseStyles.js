import { makeStyles } from "@material-ui/core/styles";
import { red } from '@material-ui/core/colors';

const useStyles = (theme) => ({
    textfield: {
        width: "85%"
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
});

export default useStyles;