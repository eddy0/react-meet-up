import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants'
import firebase from '../../app/config/firebase'

export function signInUser(creds) {
  console.log(creds)
  return async function (dispatch) {
    try {
      const result = await firebase.auth().signInWithEmailAndPassword(creds.email, creds.password )
      console.log(result)
      dispatch({
        type: SIGN_IN_USER,
        payload: result.user
      })
    } catch (error) {
      throw error
    }

  }

}

export function signOutUser() {
  return {
    type: SIGN_OUT_USER,
  }
}

