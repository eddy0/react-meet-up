import { SubmissionError, reset } from 'redux-form'
import moment from 'moment'

const log = console.log.bind(console)

const errorMessage = (message) => {
  throw new SubmissionError({
    _error: message
  })
}

const resetForm = (name) => {
  reset(name)
}

const objectToArray = (object) => {
  return Object.entries(object).map((e) => {
    return Object.assign({}, e[1], {id: e[0]})
  })
}



const createNewEvent = ({user, photoURL, displayName, event}) => {
  event.date = event.date.valueOf()
  event.timeStart = event.timeStart.valueOf()
  event.timeEnd = event.timeEnd.valueOf()

  displayName = displayName || user.displayName
  return {
    ...event,
    hostUid: user.uid,
    hostBy: displayName,
    photoURL: photoURL || '/assets/user.png',
    created: Date.now(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: photoURL || '/assets/user.png',
        displayName: displayName,
        host: true,
      }
    }
  }
}


const formatChats = (chats) => {
  let obj = {}
  Object.entries(chats).map(([id, value]) => {
    if (chats[id].parentId === 0) {
      obj[id] = {...value, id: id, children: []}
    }
  })

  Object.keys(chats).map((id) => {
    if (chats[id].parentId !== 0) {
      let parentId = chats[id].parentId
      if (obj[parentId]) {
        obj[parentId].children.push({...chats[id], id: id})
      }
    }
  })
  return obj
}


export {
  log,
  errorMessage,
  resetForm,
  objectToArray,
}