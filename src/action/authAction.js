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

export {
  LOGIN_USER,
  SIGN_OUT_USER,
  actionLogin,
  actionLogout,
}