import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import todoReducer from './todoReducer'
import eventReducer from './eventReducer'
import { Todo, IEvent } from 'src/model/model';
 import { reducer as formReducer, FormReducer } from 'redux-form'

export interface StoreState {
   loading: boolean,
   todos: Todo[],
   events: IEvent[],
   formReducer: FormReducer,
}    

const reducers = combineReducers({
  loading: loadingReducer,
  todos: todoReducer,
  events: eventReducer,
  form: formReducer,
})
    

export default reducers 