import { combineReducers } from 'redux'
import loadingReducer from './loadingReducer'
import eventReducer from './eventReducer'

const reducer = combineReducers({
  loading: loadingReducer,
  events: eventReducer,
})

export default reducer