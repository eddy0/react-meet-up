import { LOADING_END, LOADING_START } from '../../action/loadingAction'


const loadingReducer = (state=false, action) => {
  switch (action.type) {
    case LOADING_START:
      return action.loading
    case LOADING_END:
      return action.loading
    default:
      return state
  }
}

export default loadingReducer
