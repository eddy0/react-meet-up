import { createReducer } from "src/reducers/utils";
import { ActionType, Action, IEvent } from '../model/model';


const createEventReducer = (state: IEvent[], action: Action<IEvent>) => {
  return [...state, action.payload]
}


export default createReducer([], {
  [ActionType.CREATE_EVENT]: createEventReducer,
})