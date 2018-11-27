import {combineReducers} from 'redux';
import {auth, State} from './auth';


export type StoreState = {
  readonly auth: State
}

const reducers = combineReducers({
  auth,
})


export default reducers 