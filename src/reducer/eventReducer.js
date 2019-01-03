import createReducer from './utils'
import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENT, UPDATE_EVENT } from '../action/eventAction'

const fetchEventReducer = (state, action) => {
  return [...action.events]
}

const createEventReducer = (state, action) => {
  return [...state, action.event]
}

const deleteEventReducer = (state, action) => {
  return state.filter((e) => e.id !== action.id)
}

const updateEventReducer = (state, action) => {
  return state.map((event) => {
    if (event.id === action.event.id) {
      return action.event
    } else {
      return event
    }
  })
}

export default createReducer([], {
  [FETCH_EVENT]: fetchEventReducer,
  [CREATE_EVENT]: createEventReducer,
  [DELETE_EVENT]: deleteEventReducer,
  [UPDATE_EVENT]: updateEventReducer,
})