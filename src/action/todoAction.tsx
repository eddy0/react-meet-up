import { ActionType, Todo, Action } from '../model/model'

function actionAddTodo(todo: Todo): Action<Todo> {
  return {
    type: ActionType.ADD_TODO,
    payload: todo,
  }
}

function actionDeleteTodo(id: string) {
  return {
    type: ActionType.DELETE_TODO,
    payload: id,
  }
}

function actionToggleTodo(id: string) {
  return {
    type: ActionType.TOGGLE_TODO,
    payload: id,
  }
}

function handleActionDeleteTodo(id: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(actionDeleteTodo(id))
  }
}

export { 
  actionAddTodo, 
  handleActionDeleteTodo, 
  actionToggleTodo, 
}
