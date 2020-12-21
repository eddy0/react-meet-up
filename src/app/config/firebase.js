import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAOZjPWDmXP0djgdHPa3ghzhlmIUETmDyA",
  authDomain: "react-66286.firebaseapp.com",
  databaseURL: "https://react-66286.firebaseio.com",
  projectId: "react-66286",
  storageBucket: "react-66286.appspot.com",
  messagingSenderId: "21078263242",
  appId: "1:21078263242:web:26ca449a8e77aa1b0afb33"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase