import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/login_screen/LoginScreen";
import Firebase from "./firebase";
import Dashboard from './components/dashboard/Dashboard';
import { CircularProgress } from '@material-ui/core';
import EditUserScreen from './components/edit_users_screen/EditUsersScreen';

const App = () => {
    const [isFirebaseInitialized, setisFirebaseInitialized] = useState(false);

    useEffect(() => {
        Firebase.isInitialized().then((value) => {
            setisFirebaseInitialized(value);
        });
    });

    return (isFirebaseInitialized ?
        <Router>
            <Switch>
                <Route exact path="/" component={LoginScreen} />
                <Route exact path="/dash" component={Dashboard} />
                <Route exact path="/editusers" component={EditUserScreen} />
            </Switch>
        </Router> :

        <div style={{ textAlign: "center", top: "40%" }}>
            <CircularProgress />
        </div>);
}

export default App;