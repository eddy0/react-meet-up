import firebase from '../config/firebase'

const db = firebase.firestore()

export function dateFromSnapshot(snapshot) {
  if (!snapshot.exists) {
    return undefined
  }
  const data = snapshot.data()
  
  for (let prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate()
      }
    }
  }
  
  return {
    ...data,
    id: snapshot.id,
  }
}

export function getEventsFromFirestore(observer) {
  return db.collection('events').onSnapshot(observer)
}