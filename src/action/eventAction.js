import { fetchEvent } from '../utils/DATA'
import { actionLoadingEnd, actionLoadingStart } from './loadingAction'

const FETCH_EVENT = 'FETCH_EVENT'
const CREATE_EVENT = 'CREATE_EVENT'
const DELETE_EVENT = 'DELETE_EVENT'
const UPDATE_EVENT = 'UPDATE_EVENT'


const actionFetchEvent = (events) => {
  return {
    type: FETCH_EVENT,
    events: events
  }
}


const actionCreateEvent = (event) => {
  return {
    type: CREATE_EVENT,
    event: event,
  }
}

const actionDeleteEvent = (id) => {
  return {
    type: DELETE_EVENT,
    id: id
  }
}

const actionUpdateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    event: event
  }
}


const handleFetchEvent = () => {
  return (dispatch) => {
    dispatch(actionLoadingStart())
    fetchEvent().then((events) => {
      dispatch(actionFetchEvent(events))
      dispatch(actionLoadingEnd())
    })
  }
}



export {
  CREATE_EVENT,
  FETCH_EVENT,
  DELETE_EVENT,
  handleFetchEvent,
  actionCreateEvent,
  actionDeleteEvent,
  actionUpdateEvent,
}