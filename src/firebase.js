import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCJ4lNinmD-aLMlZHSC0mpRAHnWbbEpyuQ",
    authDomain: "adonis-atlas-app.firebaseapp.com",
    databaseURL: "https://adonis-atlas-app.firebaseio.com",
    projectId: "adonis-atlas-app",
    storageBucket: "adonis-atlas-app.appspot.com",
    messagingSenderId: "345973023112",
    appId: "1:345973023112:web:d6f68566f5c20ef8d05a3d"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    login(email, password) {
        ///REMEMBER: this returns a "promise" 
        ///-> Like how futures/streams work in 
        ///async functions for DART.
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    logout() {
        return this.auth.signOut();
    }

    async isInitialized() {
        //todo: see how promises work compared to futures
        return new Promise(resolve => 
            { this.auth.onAuthStateChanged(resolve) });
    }

    async currentUserExists(){
        return this.auth.currentUser.uid ? true : false ;
    }

    async getCurrentUser(){
        return await this.auth.currentUser;
    }
}

export default new Firebase();