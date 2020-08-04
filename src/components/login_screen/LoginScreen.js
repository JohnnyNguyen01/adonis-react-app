import React, { useState, useContext } from 'react';
import './LoginScreen.css';
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Firebase from "../../firebase";
import {UserContext} from '../providers/UserContext';

const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {currentUser, setCurrentUser} = useContext(UserContext);

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
        <div className="background">
            <Paper elevation={13} className="card">
                <img
                    src={require("../../assets/images/adonis_logo.png")}
                    alt="adonis_logo"
                    className="img" />
                <form className="form">
                    <div className="bottom-margin">
                        <TextField
                            className="textfield"
                            id="emailTF"
                            label="Email"
                            variant="outlined"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="bottom-margin">
                        <TextField
                            className="textfield"
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