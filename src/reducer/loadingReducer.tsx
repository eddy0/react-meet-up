import {  LOADING_START, LOADING_END, LOADING_ERROR } from '../action/loadingAction'

const loadingReducer = (state: boolean = false, action: any): boolean => {
  switch (action.type) {
    case LOADING_START:
      return true
    case LOADING_END:
      return false
    case LOADING_ERROR:
      return false
    default:
      return state
  }
}

export default loadingReducer
