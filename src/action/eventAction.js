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


const cancelToggle = (cancelled, eventId) => async (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore()
  const message = cancelled
    ? 'Are you sure you want to cancel the event?'
    : 'This reactivate the event - are you sure?'
  try {
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    })
  } catch (error) {
    console.log(error)
  }
}


const addEventComment = (eventId, values, parentId) => async (dispatch, getState, {getFirebase}) => {
  const firebase = getFirebase()
  const profile = getState().firebase.profile
  const user = firebase.auth().currentUser
  let newComment = {
    parentId: parentId,
    displayName: profile.displayName,
    photoURL: profile.photoURL || '/assets/user.png',
    uid: user.uid,
    text: values.comment,
    date: Date.now()
  }
  try {
    await firebase.push(`event_chat/${eventId}`, newComment)
  } catch (error) {
    console.log(error)
    toastr.error('Oops', 'Problem adding comment')
  }
}


const actionFetchUserEvent = (userId, activeTab) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  let today = new Date(Date.now())
  const firebase = getFirebase()
  dispatch(actionLoadingStart())
  let ref = firebase.firestore().collection('event_user')
  let query
  switch (activeTab) {
    case 'past':
      query = ref.where('userUid', '==', userId).where('eventDate', '<=', today).orderBy('eventDate', 'desc')
      break
    case 'future':
      query = ref.where('userUid', '==', userId).where('eventDate', '>=', today).orderBy('eventDate')
      break
    case 'host':
      query = ref.where('userUid', '==', userId).where('host', '==', true).orderBy('eventDate', 'desc')
      break
    default:
      query = ref.where('userUid', '==', userId).orderBy('eventDate', 'desc')
  }

  try {
    let querySnap = await query.get()
    console.log('querySnap', querySnap)
    let events = []
    for (let i = 0; i < querySnap.docs.length; i++) {
      let data = querySnap.docs[i].data()
      let event = await firebase.firestore().collection('events').doc(data.eventId).get()
      events.push({...event.data(), id: event.id})
    }
    dispatch(actionFetchEvent(events))
    dispatch(actionLoadingEnd())
  } catch (e) {
    console.log('e', e)
  }
}


const actionJoinEvent = (event) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  const firestore = getFirestore()
  const firebase = getFirebase()
  const user = await firebase.auth().currentUser
  const {displayName, photoURL} = getState().firebase.profile
  const attendee = {
    going: true,
    joinDate: Date.now(),
    photoURL: photoURL || '/assets/user.png',
    displayName: displayName,
    host: false,
  }

  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee,
    })

    await firestore.set(`event_user/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false,
    })
  } catch (e) {
    console.log('e', e)
  }
}


const actionCancelJoin = (event) =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {

    const firestore = getFirestore()
    const firebase = getFirebase()
    const user = firebase.auth().currentUser
    try {
      await firestore.update(`events/${event.id}`, {
        [`attendees.${user.uid}`]: firestore.FieldValue.delete(),
      })
      await firestore.delete(`event_user/${event.id}_${user.uid}`)
    } catch (e) {
      console.log('e', e)
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
  cancelToggle,
  addEventComment,

}