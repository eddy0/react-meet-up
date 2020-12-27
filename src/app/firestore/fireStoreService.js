import firebase from '../config/firebase'
import cuid from 'cuid'
import { log } from '../../common/util/util'

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

export function listenToEventsFromFirestore(predicate) {
  const user = firebase.auth().currentUser
  let eventRef = db.collection('events').orderBy('date')
  switch (predicate.get('filter')) {
    case 'isGoing':
      return eventRef
        .where('attendeeIds', 'array-contains', user.uid)
        .where('date', '>=', predicate.get('startDate'))
    case 'isHosting':
      return eventRef
        .where('hostUid', '==', user.uid)
        .where('date', '>=', predicate.get('startDate'))
    default:
      return eventRef
        .where('date', '>=', predicate.get('startDate'))
  }
}

export function listenToEventFromFirestore(id) {
  return db.collection('events').doc(id)
}

export function addEventToFirestore(event) {
  const user = firebase.auth().currentUser
  log(user)
  return db.collection('events').add({
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
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

export async function updateUserProfilePhoto(downloadURL, filename) {
  const user = firebase.auth().currentUser
  const userRef = db.collection('users').doc(user.uid)
  try {
    const userDoc = await userRef.get()
    // log(userDoc, userDoc.data())
    if (!userDoc.data().photoURL) {
      await db.collection('users').doc(user.uid).update({
        photoURL: downloadURL,
      })
      await user.updateProfile({
        photoURL: downloadURL,
      })
    }
    return await db.collection('users').doc(user.uid).collection('photos').add({
      name: filename,
      url: downloadURL,
    })

  } catch (error) {
    throw error
  }
}

export function getUserPhotos(userUid) {
  return db.collection('users').doc(userUid).collection('photos')
}

export async function setMainPhoto(photo) {
  const user = firebase.auth().currentUser
  try {
    await db.collection('users').doc(user.uid).update({
      photoURL: photo.url,
    })
    return await user.updateProfile({
      photoURL: photo.url,
    })
  } catch (error) {
    throw error
  }
}

//
// export async function setMainPhoto(photo) {
//   const user = firebase.auth().currentUser
//   const today = new Date()
//   const eventDocQuery = db
//     .collection('events')
//     .where('attendeeIds', 'array-contains', user.uid)
//     .where('date', '>=', today)
//   const userFollowingRef = db
//     .collection('following')
//     .doc(user.uid)
//     .collection('userFollowing')
//
//   const batch = db.batch()
//
//   batch.update(db.collection('users').doc(user.uid), {
//     photoURL: photo.url,
//   })
//
//   try {
//     const eventsQuerySnap = await eventDocQuery.get()
//     for (let i = 0; i < eventsQuerySnap.docs.length; i++) {
//       let eventDoc = eventsQuerySnap.docs[i]
//       if (eventDoc.data().hostUid === user.uid) {
//         batch.update(eventsQuerySnap.docs[i].ref, {
//           hostPhotoURL: photo.url,
//         })
//       }
//       batch.update(eventsQuerySnap.docs[i].ref, {
//         attendees: eventDoc.data().attendees.filter((attendee) => {
//           if (attendee.id === user.uid) {
//             attendee.photoURL = photo.url
//           }
//           return attendee
//         }),
//       })
//     }
//     const userFollowingSnap = await userFollowingRef.get()
//     userFollowingSnap.docs.forEach((docRef) => {
//       let followingDocRef = db
//         .collection('following')
//         .doc(docRef.id)
//         .collection('userFollowers')
//         .doc(user.uid)
//       batch.update(followingDocRef, {
//         photoURL: photo.url,
//       })
//     })
//
//     await batch.commit()
//
//     return await user.updateProfile({
//       photoURL: photo.url,
//     })
//   } catch (error) {
//     throw error
//   }
// }
//
//

export function deletePhotoFromCollection(photoId) {
  const userUid = firebase.auth().currentUser.uid
  return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete()
}

export function addUserAttendance(event) {
  const user = firebase.auth().currentUser
  return db.collection('events').doc(event.id).update({
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
  })
}

export async function cancelUserAttendance(event) {
  const user = firebase.auth().currentUser
  try {
    const eventDoc = await db.collection('events').doc(event.id).get()
    return db.collection('events').doc(event.id).update({
      attendeeIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
      attendees: eventDoc.data().attendees.filter((attendee) => attendee.id !== user.uid),
    })
  } catch (error) {
    throw error
  }
}

export function getUserEventsQuery(activeTab, userUid) {
  let eventsRef = db.collection('events')
  const today = new Date()
  switch (activeTab) {
    case 1: // past events
      return eventsRef
        .where('attendeeIds', 'array-contains', userUid)
        .where('date', '<=', today)
        .orderBy('date', 'desc')
    case 2: // hosting
      return eventsRef.where('hostUid', '==', userUid).orderBy('date')
    default:
      return eventsRef
        .where('attendeeIds', 'array-contains', userUid)
        .where('date', '>=', today)
        .orderBy('date')
  }
}

export async function followUser(profile) {
  const user = firebase.auth().currentUser
  const batch = db.batch()
  try {
    batch.set(
      db.collection('following')
        .doc(user.uid)
        .collection('userFollowing')
        .doc(profile.id),
      {
        displayName: profile.displayName,
        photoURL: profile.photoURL,
        uid: profile.id,
      }
    )
    batch.update(db.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(1),
    })
    return await batch.commit()
  } catch (error) {
    throw error
  }
}


export async function unfollowUser(profile) {
  const user = firebase.auth().currentUser;
  const batch = db.batch();
  try {
    batch.delete(
      db
        .collection('following')
        .doc(user.uid)
        .collection('userFollowing')
        .doc(profile.id)
    );

    batch.update(db.collection('users').doc(user.uid), {
      followingCount: firebase.firestore.FieldValue.increment(-1),
    });

    return await batch.commit();
  } catch (error) {
    throw error;
  }
}
