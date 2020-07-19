import React from 'react';
import './LoginScreen.css';
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { InputLabel } from '@material-ui/core';
import { Paper } from "@material-ui/core";

const LoginScreen = () => {
    return (
        <div className="background">
            <Paper elevation={13} className="card">
                <form className="form">
                    <div className="bottom-margin">
                        <TextField
                            className="textfield"
                            id="emailTF"
                            label="Email"
                            variant="outlined" />
                    </div>
                    <div className="bottom-margin">
                        <TextField
                            className="textfield"
                            id="passwordTF"
                            label="Password"
                            variant="outlined" />
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary">
                            Login
                        </Button>
                    </div>
                </form>
            </Paper>
        </div>);
}

export default LoginScreen;