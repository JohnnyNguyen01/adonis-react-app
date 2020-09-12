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

    /**
     * Logs in the user using their email and password as credentials
     * @param {String} email 
     * @param {String} password 
     */
    async login(email, password) {
        ///REMEMBER: this returns a "promise" 
        ///-> Like how futures/streams work in 
        ///async functions for DART.
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    /**
     * Signs out the currently logged in user
     */
    async logout() {
        return await this.auth.signOut();
    }

    /**
     * Checks if there is a current user logged on.
     * @returns {Boolean} whether a user is logged into Firebase
     */
    async currentUserExists() {
        return this.auth.currentUser.uid ? true : false;
    }

    async getCurrentUser() {
        return await this.auth.currentUser;
    }

    /**
     * Get a list of all the users within the "Users" data object collection
     * @returns userList: List of all user doc reference objects
     */
    async getUserList() {
        var userList = [];
        await app.firestore().collection("users").get().then((snapshot) => {
            snapshot.forEach((doc) => {
                userList.push(doc);
            });
        });
        return userList;
    }

    /**
     * Gets a list of all the users in Firestore collection "Users"
     * @returns {Array <app.firestore.DocumentData>} a list of all users and their document snapshot
     */
    async getUserListAsDoc() {
        var userList = [];
        await app.firestore().collection("users").get().then((snapshot) => {
            snapshot.forEach((doc) => {
                userList.push(doc);
            });
        });
        return userList;
    }

    /**
     *  Deletes the selected workout from the "Exercises" collection
     * @param {Object} workoutObject  the object to be deleted
     */
    async deleteSelectedWorkout(workoutObject) {

    }
    /**
     * Get a list of the document data of all the exercise documents in the "Exercises" root collection
     */
    async getExerciseList() {
        var exerciseList = [];
        await app.firestore().collection("exercises").get().then(snapshot => {
            snapshot.forEach((doc) => exerciseList.push(doc.data()));
        });
        return exerciseList;
    }

    /**
     *  creates a new workout and returns the docRef ID of the new workout
     * @param {String} coachID 
     * @param {String} clientID 
     * @param {Date} startDate 
     * @param {String} description  thew workout description set on the dashboard
     * @returns     docRefID        the encoded DocumentReferenceID of the workout
     */
    async createNewWorkoutDoc(coachID, clientID, startDate, description) {
        var docRefID;
        await app.firestore().collection("workouts").add({
            coachID: coachID,
            'date created': new Date(),
            'start date': startDate,
            userID: clientID,
            description: description,
        }).then(docRef => { docRefID = docRef.id }).catch(error => alert(error));
        return docRefID;
    }

    /**
     * Adds all the exercises to a new workout doc
     * @param {string} docRefID       the document reference ID for which doc you want to write into
     * @param {Array<object>} allWorkouts   object containing the workouts you want to add in
     * @param {Array<Date>} dayDates    an object of dates that corresponds to each exercise
     */
    async addExerciseToNewWorkoutDoc(docRefID, allWorkouts, dayDates) {
        Object.entries(allWorkouts).forEach((workoutEntry) => {
            const [indexKey, workout] = workoutEntry;
            app.firestore().collection("workouts").doc(docRefID).collection("Days").add({
                //todo: sort out dates array
                dates: dayDates[`${indexKey.toString()}`],
                day: indexKey,
                exercises: workout
            });
        });
    }

    /**
     * Get all the user workouts document data within the "workouts" collection
     * @param {String} uid the userID that you want to get the workouts for 
     */
    async getAllUserWorkouts(uid) {
        var workouts = app.firestore().collection("workouts").where("userID", "==", uid);
        workouts.get().then(querySnapshot => querySnapshot.forEach(doc => doc.data()));
    }

    /**
     *  Retrieve the latest workout doc for the specified userID
     * @param {String} uid  The usedID of the account we want to retrieve from
     * @returns {app.firestore.querySnapshot} the latest workout for uid
     */
    async getLatestWorkoutForUser(uid) {
        var userWorkoutList = [];
        var workoutRefs = await app.firestore().collection("workouts")
            .where("userID", "==", uid).orderBy("date created").limit(1).get();
        workoutRefs.forEach(workoutDoc => userWorkoutList.push(workoutDoc));
        return userWorkoutList[0];
    }

    /**
     * Adds a new exercise to the "Exercises" root collection
     * @param {String} exerciseName 
     * @param {String} excerciseURL 
     */
    async addNewExerciseToDB(exerciseName, exerciseURL) {
        await app.firestore().collection("exercises").doc().set({
            exerciseName: exerciseName,
            exerciseURL: exerciseURL
        });
    }

    /**
     * Deletes the indicated exercise from the "exercises" collections
     * @param {String} exerciseName Name of the exercise you want to delete
     */
    async deleteExeriseFromName(exerciseName) {
        var allExercises = await app.firestore().collection("exercises").get();
        allExercises.forEach(doc => {
            if (doc.data().exerciseName === exerciseName) {
                app.firestore().collection("exercises").doc(doc.ref.id).delete();
            }
        });
    }

    /**
     * Delete a user from the User's collection via uid
     * @param {String} uid  the uid of the user you want to delete
     */
    async deleteUserWithUID(uid) {
        try {
            app.firestore().collection("users").doc(uid).delete();
        } catch (e) {
            alert(e);
        }
    }

    /**
     * Save the workout created by the coach to the database for future use
     * @param {String} workoutName The name fo the workout
     * @param {String} coachID  The UID of the coach
     * @param {Object} allWorkouts The object containing all the exercises
     */
    async saveCreatedWorkout(workoutName,coachID,allWorkouts){
        app.firestore().collection("saved_workout_templates").add({
            'coachID': coachID,
            'workoutName' : workoutName,
            'date created' : new Date(),
            'exercises' : allWorkouts
           });
    }

    //returns every single workout in a list
    async getAllWorkoutsAsDocList() {
        var workoutList = [];
        var workouts = await app.firestore().collection("workouts").get();
        workouts.forEach(workout => workoutList.push(workout.data()));
        return workoutList;
    }

    async updateWorkoutWithRef(docRef, updateObj) {
        await docRef.update(updateObj);
    }
}

export default new Firebase();