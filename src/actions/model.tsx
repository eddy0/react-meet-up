
export interface Todo {
  id: string,
  task: string,
  complete: boolean,
}


export enum ActionType {
  ADD_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  TOGGLE_TODO,
}

export interface Action<T>{
  type: ActionType,
  payload: T
}