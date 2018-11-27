import {  Action } from 'redux'


// action
const INCREMENT = 'INCREMENT'
export type INCREMENT = typeof INCREMENT

export const actionIncrement = (data:number) => {
  return {
    type: INCREMENT,
    data,
  }
}

const handleIncrement = (data:number) => {
  return actionIncrement(data)
}

// reducer
export type State = {
  readonly data: number
}

const Istate: State = {
  data: 42,
}

const auth = (state=Istate, action:Action) => {
  switch(action.type) {
    case INCREMENT:
      return {
        ...state,
        data: state.data + 1
      }
      default:
        return state
  }
}

export {
   auth, 
  handleIncrement,
 }
