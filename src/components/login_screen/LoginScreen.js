import React, { useState, useContext } from 'react';
import './LoginScreen.css';
import { Button, makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Firebase from "../../firebase";
import { UserContext } from '../providers/UserContext';

const useStyles = makeStyles((theme) => ({
    background: {
        backgroundImage: "src/assets/images/login_page_background.jpeg",
        minHeight: "100%",
        minWidth: "1024px",
        width: "100%",
        height: "auto",
        position: "fixed",
        top: 0,
        left: 0
    },
    card: {
        position: "absolute",
        left: "40%",
        top: "30%",
        width: "450px",
        height: "450px",
        opacity:"80%"
    },
    form: {
        textAlign: "center",
    },

    textfield: {
        width: "270px"
    },

    bottomMargin: {
        marginBottom: "12px",
    }

    , img: {
        paddingTop: "40px",
        paddingLeft: "75px",
        opacity: "80%"
    }
}));

const LoginScreen = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const onLogin = async () => {
        try {
            await Firebase.login(email, password);
            await Firebase.auth.onAuthStateChanged((user) => {
                if (user) { setCurrentUser(user) }
            });
            props.history.replace("/dash");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <img
                src="https://classpass-res.cloudinary.com/image/upload/f_auto,q_auto/i2wbhwcjij65tyvncrtv.png"
                alt=""
                className={classes.background} />
            <Paper elevation={13} className={classes.card}>
                <img
                    src={require("../../assets/images/adonis_logo.png")}
                    alt="adonis_logo"
                    className={classes.img} />
                <form className="form">
                    <div className="bottom-margin">
                        <TextField
                            className={classes.textfield}
                            id="emailTF"
                            label="Email"
                            variant="outlined"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className={classes.bottomMargin}>
                        <TextField
                            className={classes.textfield}
                            type="password"
                            id="passwordTF"
                            label="Password"
                            variant="outlined"
                            onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onLogin}>
                            Login
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>);
}

export default LoginScreen;