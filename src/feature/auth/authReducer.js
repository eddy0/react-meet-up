import { SIGN_IN_USER, SIGN_OUT_USER } from './authConstants'

const initialState = {
  authenticated: false,
  currentUser: null,
}

// const initialState = {
//   authenticated: true,
//   currentUser: {
//     email: 'gua',
//     photoURL: '/assets/user.png',
//   },
// }


const authReducer = (state=initialState, {type, payload}) => {
  switch (type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          uid: payload.uid,
          displayName: payload.displayName,
          providerId: payload.providerData[0].providerId,
          email: payload.email,
          photoURL: payload.photoURL || '/assets/user.png'
        },
      }
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      }
    default:
      return state
  }
}

export default authReducer