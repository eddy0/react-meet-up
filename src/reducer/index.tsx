import {combineReducers} from 'redux';
import loadingReducer from './loadingReducer';
import todoReducer from './todoReducer'
import eventReducer from './eventReducer'
import {IEvent, Todo} from '../model/model';
import {reducer as formReducer} from 'redux-form'

export interface StoreState {
   loading: boolean,
   todos: Todo[],
   events: IEvent[],
}

const reducers = combineReducers({
  loading: loadingReducer,
  todos: todoReducer,
  events: eventReducer,
  form: formReducer,
})
    

export default reducers 