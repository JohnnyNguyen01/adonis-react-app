import React, {useState, useEffect} from 'react';
import './LoginScreen.css';
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import Firebase from "../firebase";

const LoginScreen = () => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[emailIsValid, setEmailIsValid] = useState(null);
    
    const onLogin = async () => {
        try{
           await Firebase.login(email, password);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="background">
            <Paper elevation={13} className="card">
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