import firebase from '../config/firebase'
import cuid from 'cuid'

const db = firebase.firestore()

export function dataFromSnapshot(snapshot) {
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

export function listenToEventsFromFirestore() {
  return db.collection('events')
}

export function listenToEventFromFirestore(id) {
  return db.collection('events').doc(id)
}

export function addEventToFirestore(event) {
  return db.collection('events').add({
    ...event,
    hostedBy: 'gua',
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      displayName: 'gua',
      photoURL: 'https://randomuser.me/api/portraits/women/27.jpg',
      
    }),
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/27.jpg',
  })
}

export function updateEventToFirestore(event) {
  return db.collection('events').doc(event.id).update(event)
}

export function deleteEventInFirestore(eventId) {
  return db.collection('events').doc(eventId).delete()
}

export function cancelEventToggle(event) {
  return db.collection('events').doc(event.id).update({
    isCancelled: !event.isCancelled,
  })
}

export function getUserProfile(userId) {
  return db.collection('users').doc(userId)
}

export function setUserProfileData(user) {
  return db.collection('users').doc(user.uid).set({
    displayName: user.displayName,
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}

export async function updateUserProfile(profile) {
  const user = firebase.auth().currentUser
  try {
    if (user.displayName !== profile.displayName) {
      await user.updateProfile({
        displayName: profile.displayName,
      })
    }
    return await db.collection('users').doc(user.uid).update(profile)
  } catch (error) {
    throw error
  }
}

