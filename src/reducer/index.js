import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import eventReducer from './eventReducer'
import modalReducer from './modalReducer'
import authReducer from './authReducer'
import {reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  loading: loadingReducer,
  events: eventReducer,
  modal: modalReducer,
  form: formReducer,
  auth: authReducer,
})

export default reducer