import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import eventReducer from './eventReducer'
import modalReducer from './modalReducer'
import authReducer from './authReducer'
import {reducer as formReducer } from 'redux-form'
import {reducer as toastrReducer } from 'react-redux-toastr'

const reducer = combineReducers({
  loading: loadingReducer,
  events: eventReducer,
  modal: modalReducer,
  form: formReducer,
  auth: authReducer,
  toastr: toastrReducer,
})

export default reducer