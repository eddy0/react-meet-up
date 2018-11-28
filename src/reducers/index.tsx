import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import todoReducer from './todoReducer'
import { Todo } from 'src/actions/model';
      
export interface StoreState {
   loading: boolean,
   todos: Todo[]
}    

const reducers = combineReducers({
  loading: loadingReducer,
  todos: todoReducer,
})
    

export default reducers 