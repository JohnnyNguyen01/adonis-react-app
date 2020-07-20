import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    addButton: {
        backgroundColor: green[400],
        marginTop: "10px",
        marginRight: "5px",
        color: "#FFFFFF"
    },
    removeButton: {
        backgroundColor: red[500],
        marginTop: "10px",
        marginLeft: "5px",
        color: "#FFFFFF",
    },
    floatRight:{
        float: "right",
    }
});

export default useStyles;
