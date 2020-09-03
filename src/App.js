import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, HashRouter, Switch, Route } from "react-router-dom";
import LoginScreen from "./components/login_screen/LoginScreen";
import Dashboard from './components/dashboard/Dashboard';
import EditUserScreen from './components/edit_users_screen/EditUsersScreen';
import { UserContext } from './components/providers/UserContext';
import ManageExercisesScreen from './components/manage_exercises_screen/manageExercises';
import UserProfileScreen from './components/user_profile_screen/UserProfileScreen';
import { CurrentClientContext } from './components/providers/CurrentClientContext';

const App = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const currentUserProviderValues =
        useMemo(() => ({ currentUser, setCurrentUser }), [currentUser, setCurrentUser]);
    //set up currentClientContext
    const [currentClient, setCurrentClient] = useState({});
    const currentClientProviderValues =
        useMemo(() => ({ currentClient, setCurrentClient }), [currentClient, setCurrentClient]);

    return (
        <UserContext.Provider value={currentUserProviderValues}>
            <CurrentClientContext.Provider value={currentClientProviderValues}>
                <HashRouter basename='/'>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={LoginScreen} />
                            <Route exact path="/dash" component={Dashboard} />
                            <Route exact path="/editusers" component={EditUserScreen} />
                            <Route exact path="/manageExercises" component={ManageExercisesScreen} />
                            <Route exact path={`/userProfile=${currentClient.uid}`} component={UserProfileScreen} />
                        </Switch>
                    </Router>
                </HashRouter>
            </CurrentClientContext.Provider>
        </UserContext.Provider>);
}

export default App;
