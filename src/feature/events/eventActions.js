import { CREATE_EVENT, DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from './eventConstants'
import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../app/async/asyncReducer'
import { fetchSampleData } from '../../app/api/mockApi'

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

const loadEvents = () => {
  return async (dispatch) => {
    dispatch(asyncActionStart())
    try {
      const events = await fetchSampleData()
      dispatch({
        type: FETCH_EVENTS,
        payload: events,
      })
      dispatch(asyncActionFinish())
    } catch (error) {
      dispatch(asyncActionError())
    }
  }
}

const listenToEvents = (events) => {
  return {
    type: FETCH_EVENTS,
    payload: events,
  }
}

export  {
  createEvent,
  updateEvent,
  deleteEvent,
  loadEvents,
  listenToEvents,
}