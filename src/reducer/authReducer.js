import createReducer from './utils'
import { LOGIN_USER, SIGN_OUT_USER } from '../action/authAction'


const loginReducer = (state, action) => {
  return {
    ...state,
    authentication: true,
    currentUser: action.auth.email,
  }
}

const signOutReducer = (state, action) => {
  return {
    ...state,
    authentication: false,
    currentUser: {}
  }
}

const authReducer = createReducer({}, {
  [LOGIN_USER]: loginReducer,
  [SIGN_OUT_USER]: signOutReducer,
})

export default authReducer