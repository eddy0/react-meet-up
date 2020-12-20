import { combineReducers } from 'redux'
import eventReduer from '../../feature/events/eventReducer'

const rootReducer = combineReducers({
  event: eventReduer,
})

export default rootReducer