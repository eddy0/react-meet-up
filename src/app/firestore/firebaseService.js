import firebase from '../config/firebase'
import { setUserProfileData } from './fireStoreService'

export function signInWithEmail(creds) {
  const result = firebase.auth().signInWithEmailAndPassword(creds.email, creds.password)
  return result
}

export function signOutFirebase() {
  return firebase.auth().signOut()
}

export async function registerInFirebase(creds) {
  try {
    const result = await  firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password)
    await result.user.updateProfile({
      displayName: creds.displayName,
    })
    return await setUserProfileData(result.user)
  } catch (e) {
    throw e
  }
}

export function updateUserPassword(creds) {
  const user = firebase.auth().currentUser;
  return user.updatePassword(creds.newPassword1);
}
