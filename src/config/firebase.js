import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyBCi1InI3LebQVzRWhcAnOyOHxy-9IkL7s',
  authDomain: 'chat-432bc.firebaseapp.com',
  databaseURL: 'https://chat-432bc.firebaseio.com',
  projectId: 'chat-432bc',
  storageBucket: 'chat-432bc.appspot.com',
  messagingSenderId: '1063660551606'
}

firebase.initializeApp(config)
firebase.firestore()

export default firebase

