export interface IAttendee {
  id: string
  name: string
  photoURL: string
}

export interface IEvent {
  id: string
  title: string | ''
  date: string | ''
  category?: string
  description?: string
  city?: string
  hostedBy?: string
  hostPhotoURL?: string
  attendees?: IAttendee[]
}

export interface Todo {
  id: string
  task: string
  complete: boolean
}

// enum EventType {
//   CREATE_EVENT = 'CREATE_EVENT',
//   UPDATE_EVENT = 'UPDATE_EVENT',
//   DELETE_EVENT = 'DELETE_EVENT',
// }

// enum TodoType {
//   ADD_TODO = 'ADD_TODO',
//   DELETE_TODO = 'DELETE_TODO',
//   COMPLETE_TODO = 'COMPLETE_TODO',
//   TOGGLE_TODO = 'TOGGLE_TODO',
// }

// 如何分离不同的 enum
export enum ActionType {
  CREATE_EVENT = 'CREATE_EVENT',
  UPDATE_EVENT = 'UPDATE_EVENT',
  DELETE_EVENT = 'DELETE_EVENT',
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
  COMPLETE_TODO = 'COMPLETE_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
}

export interface Action<T> {
  type: ActionType
  // 如何做到分开不同的类型???
  // [propName: string]: T | ActionType
  [payload: string]: T | ActionType
}

