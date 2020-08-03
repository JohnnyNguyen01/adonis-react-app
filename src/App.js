import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/login_screen/LoginScreen";
import Dashboard from './components/dashboard/Dashboard';
import { CircularProgress } from '@material-ui/core';
import EditUserScreen from './components/edit_users_screen/EditUsersScreen';

const App = () => {
    return (
        <Router>
            <Switch>
                    <Route exact path="/" component={LoginScreen} />
                    <Route exact path="/dash" component={Dashboard} />
                    <Route exact path="/editusers" component={EditUserScreen} />
            </Switch>
        </Router>);
}

export default App;