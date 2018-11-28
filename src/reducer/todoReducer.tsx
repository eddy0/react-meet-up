import { createReducer } from './utils'
import { ActionType, Todo,  Action } from '../model/model';

const handleAddTodo = (state:Todo[], action: Action<Todo>) => {
  return [...state, action.payload]
}

const handleDeleteTodo = (state:Todo[], action: Action<Todo['id']>) => {
  return state.filter((todo) => todo.id !== action.payload )
}

const handleToggleTodo = (state:Todo[], action: Action<Todo['id']>) => {
  return state.map((todo) => {
    if (todo.id === action.payload) {
      return {...todo, complete: !todo.complete}
    }
    return todo
  })
}

export default createReducer([], {
  [ActionType.ADD_TODO]: handleAddTodo,
  [ActionType.DELETE_TODO]: handleDeleteTodo,
  [ActionType.TOGGLE_TODO]: handleToggleTodo,
})
