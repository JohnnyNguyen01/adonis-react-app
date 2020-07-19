import React from 'react';
import './LoginScreen.css';
import { Card } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { InputLabel } from '@material-ui/core';
import { Grid } from "@material-ui/core";
import {GridItem} from "@material-ui/core";

const LoginScreen = () => {
    return (
        <div className="background">
            <Card raised="true" className="card">
                <Grid container spacing="true" alignItems="center" alignContent="center">

                    <Grid item className="textField">
                        <InputLabel>Username</InputLabel>
                        <TextField id="username" type="text" inputProps={"a"} />
                    </Grid >
                    <div className="textField">
                        <InputLabel>Password</InputLabel>
                        <TextField id="password" type="text" inputProps={"a"} />
                    </div>
                    <div>

                    </div>

                </Grid>

            </Card>
        </div>);
}

export default LoginScreen;