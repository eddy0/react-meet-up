import { createReducer } from "../reducer/utils";
import { ActionType, IEvent, Action } from '../model/model';

const createEventReducer = (state: IEvent[], action: Action<IEvent>) => {
  return [...state, action.event]
}

const deleteEventReducer = (state: IEvent[], action: Action<string>) => {
  return state.filter((event) => event.id !== action.id)
}

const updateEventReducer = (state: IEvent[], action: Action<IEvent>) => {
  return state.map((e) => {
    if (e.id === action.event.id) {
      return event
    }
    return e
  })
}


export default createReducer([], {
  [ActionType.CREATE_EVENT]: createEventReducer,
  [ActionType.DELETE_EVENT]: deleteEventReducer,
  [ActionType.DELETE_EVENT]: updateEventReducer,
})
