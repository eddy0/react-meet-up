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
  venue?:string,
  attendees?: IAttendee[]
}

export interface Todo {
  id: string
  task: string
  complete: boolean
}

enum EventType {
  FETCH_EVENT = 'FETCH_EVENT',
  CREATE_EVENT = 'CREATE_EVENT',
  UPDATE_EVENT = 'UPDATE_EVENT',
  DELETE_EVENT = 'DELETE_EVENT',
}

enum TodoType {
  ADD_TODO = 'ADD_TODO',
  DELETE_TODO = 'DELETE_TODO',
  COMPLETE_TODO = 'COMPLETE_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
}

export const ActionType =  {
  ...EventType,
  ...TodoType
}

// 如何分离不同的 enum
// export enum ActionType {
//   FETCH_EVENT = 'FETCH_EVENT',
//   CREATE_EVENT = 'CREATE_EVENT',
//   UPDATE_EVENT = 'UPDATE_EVENT',
//   DELETE_EVENT = 'DELETE_EVENT',
//   ADD_TODO = 'ADD_TODO',
//   DELETE_TODO = 'DELETE_TODO',
//   COMPLETE_TODO = 'COMPLETE_TODO',
//   TOGGLE_TODO = 'TOGGLE_TODO',
// }


// export interface Action<T> {
//   type: ActionType
//   // 如何做到分开不同的类型???
//   // [propName: string]: T | ActionType
//   [payload: string]: T | ActionType
// }

// action 传入的类型 T, 与 payload 的类型一致 
export interface Action<T> {
  type: string, 
  // 如何做到分开不同的类型???
  // [propName: string]: T | ActionType
  // 其他类型与传入的类型一致, 但是不包括 type 这个属性, 目前只知道用或包含住 type 的类型,
  // 但是会出现其他问题
  payload: T,
}

