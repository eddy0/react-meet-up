import { combineReducers } from 'redux'
import eventReduer from '../../feature/events/eventReducer'
import modalReducer from '../../common/modals/modalReducer'
import authReducer from '../../feature/auth/authReducer'
import asyncReducer from '../async/asyncReducer'

const rootReducer = combineReducers({
  event: eventReduer,
  modal: modalReducer,
  auth: authReducer,
  async: asyncReducer,
})

export default rootReducer