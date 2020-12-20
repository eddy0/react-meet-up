import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from './eventConstants'

const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: event,
  }
}

const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  }
}

const deleteEvent = (id) => {
  return {
    type: DELETE_EVENT,
    payload: id,
  }
}

export  {
  createEvent,
  updateEvent,
  deleteEvent,
}