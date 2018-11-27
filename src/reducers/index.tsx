import * as React from 'react';
import {combineReducers} from 'redux';

// export interface IAppProps {
// }

const LOGIN = 'LOGIN'
type LOGIN = typeof LOGIN

const LOGOUT = 'LOGOUT'
type LOGOUT = typeof LOGOUT

export interface ILogin {
  type: LOGIN
}
export interface ILogout {
  type: LOGOUT
}


type auth = ILogin | ILogout


const ActionhandleLogin = ():ILogin => {
  return {
    type: LOGIN,
  }
}

const ActionhandleLogout = ():ILogout => {
  return {
    type: LOGOUT,
  }
}

const auth = (state=false, action:auth):boolean => {
  switch(action.type) {
    case LOGIN:
      return false
    case LOGOUT:
      return false
    default:
      return state
  }
}


type IReducers = {
  auth: boolean
}

const reducers:IReducers = combineReducers({
  auth,
})


export default reducers 