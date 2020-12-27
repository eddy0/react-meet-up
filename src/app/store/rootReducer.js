import { combineReducers } from 'redux'
import eventReduer from '../../feature/events/eventReducer'
import modalReducer from '../../common/modals/modalReducer'
import authReducer from '../../feature/auth/authReducer'
import asyncReducer from '../async/asyncReducer'
import profileReducer from '../../feature/profiles/profileReducer'
import { connectRouter } from 'connected-react-router'

const rootReducer = (history) => combineReducers({
  event: eventReduer,
  modal: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  profile: profileReducer,
  router: connectRouter(history),
})

export default rootReducer