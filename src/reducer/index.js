import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import eventReducer from './eventReducer'
import {reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  loading: loadingReducer,
  events: eventReducer,
  form: formReducer,
})

export default reducer