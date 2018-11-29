import { createReducer } from "../reducer/utils";
import { ActionType, IEvent, Action } from '../model/model';

const fetchEventReducer = (state: IEvent[], action: Action<IEvent[]>) => {
  return [...state, ...action.payload]
}

const createEventReducer = (state: IEvent[], action: Action<IEvent>) => {
  return [...state, action.payload]
}

const deleteEventReducer = (state: IEvent[], action: Action<string>) => {
  return state.filter((event) => event.id !== action.payload)
}

const updateEventReducer = (state: IEvent[], action: Action<IEvent>) => {
  return state.map((e) => {
    if (e.id === action.payload.id) {
      return event
    }
    return e
  })
}

export default createReducer([], {
  [ActionType.FETCH_EVENT]:fetchEventReducer,
  [ActionType.CREATE_EVENT]: createEventReducer,
  [ActionType.DELETE_EVENT]: deleteEventReducer,
  [ActionType.DELETE_EVENT]: updateEventReducer,
})
