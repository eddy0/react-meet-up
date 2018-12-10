import { Action } from "../model/model";


const createReducer = (initialState:{}, map:any) => {
  return function reducer(state:any=initialState, action: Action<any>) {
    if (map.hasOwnProperty(action.type)) {
      return map[action.type](state, action)
    } else {
      return state
    }
  }
}

export {createReducer}