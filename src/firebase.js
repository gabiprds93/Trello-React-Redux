import firebase from 'firebase';

// Initialize Firebase
var config = 
{
    apiKey: "AIzaSyDMg_E_HmXrtp_SKiuisYQ7UpQj9dfWIIg",
    authDomain: "trello-react-redux.firebaseapp.com",
    databaseURL: "https://trello-react-redux.firebaseio.com",
    projectId: "trello-react-redux",
    storageBucket: "trello-react-redux.appspot.com",
    messagingSenderId: "648141349493"
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();