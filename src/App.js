import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/login_screen/LoginScreen";
import Dashboard from './components/dashboard/Dashboard';
import { CircularProgress } from '@material-ui/core';
import EditUserScreen from './components/edit_users_screen/EditUsersScreen';
import { UserContext } from './components/providers/UserContext';

const App = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const currentUserProviderValues =
        useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser]);
    
        return (
        <UserContext.Provider value={currentUserProviderValues}>
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginScreen} />
                    <Route exact path="/dash" component={Dashboard} />
                    <Route exact path="/editusers" component={EditUserScreen} />
                </Switch>
            </Router>
        </UserContext.Provider>);
}

export default App;