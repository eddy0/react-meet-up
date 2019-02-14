import { fetchEvent } from '../utils/DATA'
import { actionLoadingEnd, actionLoadingStart } from './loadingAction'
import { toastr } from 'react-redux-toastr'
import { log } from '../utils/utils'


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
      toastr.success('success', 'fetch event success')
    })
  }
}


const handleCreateEvent = (event, cb) => {
  return async (dispatch) => {
    dispatch(actionLoadingStart())
    await dispatch(actionCreateEvent(event))
    dispatch(actionLoadingEnd())
    cb()
  }
}


const handleUpdateEvent = (event, cb) => {
  return async (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore()
    try {
      dispatch(actionLoadingStart())
      // await dispatch(actionUpdateEvent(event))
      await firestore.update(`events/${event.id}`, event)
      toastr.success('success', 'fetch event success')
      dispatch(actionLoadingEnd())
      cb()
    } catch (error) {

    }
  }
}

const createNewEvent = (user, photoURL, event) => {
  photoURL = photoURL || 'assets/user.png'
  return {
    ...event,
    date: new Date(event.date),
    hostUid: user.uid,
    hostPhotoURL: photoURL,
    createdAt: Date.now(),
    hostedBy: user.displayName,
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: photoURL,
        host: true,
        displayName: user.displayName,
      }
    }

  }
}

const createEvent = (event) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const currentUser = firebase.auth().currentUser
  log(currentUser)
  const photoURL = getState().firebase.profile.photoURL
  const e = createNewEvent(currentUser, photoURL, event)
  try {
    let newEvent = await firestore.add(`events`, e)
    toastr.success('success', 'event has been updated')
    log(newEvent, currentUser)
    await firestore.set(`event_attendee/${newEvent.id}_${currentUser.uid}`, {
      eventId: newEvent.id,
      userId: currentUser.uid,
      eventDate: new Date(event.date),
      host: true,
    })
  } catch (error) {
    log(error)
  }
}

export {
  CREATE_EVENT,
  FETCH_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  handleFetchEvent,
  actionCreateEvent,
  createEvent,
  actionDeleteEvent,
  actionUpdateEvent,
  handleCreateEvent,
  handleUpdateEvent,
}