import { actionCloseModal } from './modalAction'

const log = console.log.bind(console)

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
  } catch (e) {
    log(e)
  }
}

export {
  LOGIN_USER,
  SIGN_OUT_USER,
  actionLogin,
  actionLogout,
  handleLogin,
}