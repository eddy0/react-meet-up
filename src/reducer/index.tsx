import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import todoReducer from './todoReducer'
import eventReducer from './eventReducer'
import { Todo, IEvent } from 'src/model/model';
      
export interface StoreState {
   loading: boolean,
   todos: Todo[],
   events: IEvent[],
}    

const reducers = combineReducers({
  loading: loadingReducer,
  todos: todoReducer,
  events: eventReducer,
})
    

export default reducers 