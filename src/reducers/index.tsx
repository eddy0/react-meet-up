import {combineReducers} from 'redux';
import {auth, State} from './auth';
import LoadingReducer from './LoadingReducer';
   
      
export interface StoreState {
  readonly auth: State,
  readonly loading: boolean,
}    



const reducers = combineReducers({
  auth,
  loading: LoadingReducer                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 ,
})
    

export default reducers 