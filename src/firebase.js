import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import User from "./models/User";

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

    async login(email, password) {
        ///REMEMBER: this returns a "promise" 
        ///-> Like how futures/streams work in 
        ///async functions for DART.
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    async logout() {
        return await this.auth.signOut();
    }

    async currentUserExists() {
        return this.auth.currentUser.uid ? true : false;
    }

    async getCurrentUser() {
        return await this.auth.currentUser;
    }

    async getUserList() {
        var userList = [];
        await app.firestore().collection("users").get().then((snapshot) => {
            snapshot.forEach((doc) => {
                userList.push(doc.data());
            });
        });
        return userList;
    }

    async getUserListAsDoc() {
        var userList = [];
        await app.firestore().collection("users").get().then((snapshot) => {
            snapshot.forEach((doc) => {
                userList.push(doc);
            });
        });
        return userList;
    }

    async getExerciseList() {
        var exerciseList = [];
        await app.firestore().collection("exercises").get().then(snapshot => {
            snapshot.forEach((doc) => exerciseList.push(doc.data()));
        });
        return exerciseList;
    }

    async createNewWorkoutDoc(coachID, clientID) {
        await app.firestore().collection("workouts").doc().set({
            coachID: coachID,
            'date created': new Date(),
            userID: clientID,
        });
    }
    //get all user workouts
    async getAllUserWorkouts(uid) {
        var workouts = app.firestore().collection("workouts").where("userID", "==", uid);
        workouts.get().then(querySnapshot => querySnapshot.forEach(doc => doc.data()));
    }

    //grab latest user workout
    async getLatestWorkoutForUser(uid) {
       var userWorkoutList = [];
       var workoutRefs = await app.firestore().collection("workouts")
       .where("userID", "==", uid).orderBy("date created").limit(1).get();
       workoutRefs.forEach(workoutDoc => userWorkoutList.push(workoutDoc));
       return userWorkoutList[0];
    }

    //returns every single workout in a list
    async getAllWorkoutsAsDocList(){
        var workoutList = [];
        var workouts = await app.firestore().collection("workouts").get();
        workouts.forEach(workout => workoutList.push(workout.data()));
        return workoutList;
    }

    async updateWorkoutWithRef(docRef, updateObj){
        await docRef.update(updateObj);
    }
}

export default new Firebase();