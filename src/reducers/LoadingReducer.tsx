import { LoadingAction, LOADING_START, LOADING_END, LOADING_ERROR } from 'src/actions/loading';
import { StoreState } from 'src/reducers';



const loadingReducer = (state={false}, action<LoadingAction>) => {
  switch(action.type) {
    case LOADING_START:
      return true
    case LOADING_END:
      return false
    case LOADING_ERROR:
      return false
  }
}

export default LoadingReducer