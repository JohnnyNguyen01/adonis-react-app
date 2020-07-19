import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginScreen from "./login_screen/LoginScreen";
import Firebase from "./firebase";

const App = () => {
    const [isFirebaseInitialized, setisFirebaseInitialized] = useState(false);

    useEffect(() => {
        Firebase.isInitialized().then( (value) => {
            setisFirebaseInitialized(value);
        });
    });

    return isFirebaseInitialized ? (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginScreen}/>
            </Switch>
        </Router>
    ) : <div>Firbase backend is loading</div> ;
}

export default App;