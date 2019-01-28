import { actionCloseModal } from './modalAction'
import { errorMessage } from '../utils/utils'
import log from '../utils/utils'


const LOGIN_USER = 'LOGIN_USER'
const SIGN_OUT_USER = 'SIGN_OUT_USER'

const actionLogin = (auth) => {
  return {
    type: LOGIN_USER,
    auth,
  }
}


const actionLogout = () => {
  return {
    type: SIGN_OUT_USER,
  }
}

const handleLogin = (auth) => async (dispatch, getState, {getFirebase, getFireStore}) => {
  const firebase = getFirebase()
  try {
    await firebase.auth().signInWithEmailAndPassword(auth.email, auth.password)
    dispatch(actionCloseModal())
  } catch (error) {
    errorMessage(error.message)
  }
}

const createUser = async (firebase, firestore, user) => {
  // create user in auth
  let u = await firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(user.email, user.password)
  log(u)

  // update profile
  await u.user.updateProfile({
    displayName: user.displayName
  })

  // create a new profile in firestore
  let newUser = {
    displayName: user.displayName,
    createAt: firestore.FieldValue.serverTimestamp()
  }

  await firestore.set(`users/${u.user.uid}`, {...newUser})
}

const handleRegister = (user) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase()
  const firestore = getFirestore()
  try {
    await createUser(firebase, firestore, user)
    dispatch(actionCloseModal())
  } catch (error) {
    errorMessage(error.message)
  }
}


const socialLogin = (provider) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firebase = getFirebase()
  const firestore = getFirestore()
  try {
    dispatch(actionCloseModal())
    let u = await firebase.login({
      provider: provider,
      type: 'popup'
    })
    if (u.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${u.user.uid}`, {
        displayName: u.user.displayName,
        photoURL: u.user.photoURL,
        createAt: firestore.FieldValue.serverTimestamp(),
      })
    }
  } catch (error) {
    log(error)
  }
}

export {
  LOGIN_USER,
  SIGN_OUT_USER,
  actionLogin,
  actionLogout,
  handleLogin,
  handleRegister,
  socialLogin,
}