import { toastr } from 'react-redux-toastr'
import { actionLoadingEnd, actionLoadingStart } from './loadingAction'
import log from '../utils/utils'
import { generate } from '../utils/DATA'

const uploadPhoto = (file, fileName) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  let firebase = getFirebase()
  let firestore = getFirestore()
  let imageName = generate() + '_' + fileName
  const user = await firebase.auth().currentUser
  const path = `${user.uid}/user_images`
  const options = {
    name: imageName
  }
  try {
    dispatch(actionLoadingStart())
    let uploadedFile = await firebase.uploadFile(path, file, null, options)
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL()
    let userDoc = await firestore.get(`users/${user.uid}`)
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      })
      await user.updateProfile({
        photoURL: downloadURL
      })
    }
    dispatch(actionLoadingEnd())
    return await firestore.add({
      collection: 'users',
      doc: user.uid,
      subcollections: [{collection: 'photos'}]
    }, {
      name: imageName,
      url: downloadURL,
    })
  } catch (error) {
    console.log('error', error)
    dispatch(actionLoadingEnd())
    toastr.error('failed', 'something wrong, please try again')
  }
}


const updateProfilePhoto = (url) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  let firebase = getFirebase()
  try {
    dispatch(actionLoadingStart())
    await firebase.updateProfile({
      photoURL: url,
    })
    dispatch(actionLoadingEnd())
  } catch (e) {
    console.log('e', e)
  }
}

const deletePhoto = (photo) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  let firebase = getFirebase()
  let firestore = getFirestore()

  try {
    const user = await firebase.auth().currentUser

    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`)
    console.log('user', user, `${user.uid}/user_images/${photo.name}`)
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{collection: 'photos', doc: photo.id}]
    })

  } catch (e) {
    console.log('e', e)
  }
}

const getUserEvents = (userId, activeTab) => async (dispatch, getState, {getFirebase, getFirestore}) => {
  let today = new Date(Date.now())
  const firestore = getFirestore()

  dispatch(actionLoadingStart())
  let ref = firestore.collection('attendees')
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
      let event = await firestore.collection('events').doc(data.eventId).get()
      events.push({...event.data(), id: event.id})
    }
    console.log('events', events)
    // dispatch(actionFetchEvent(events))
    dispatch(actionLoadingEnd())
  } catch (e) {
    console.log('e', e)

  }
}


const followUser = userToFollow => async (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore()
  const user = firestore.auth().currentUser
  const following = {
    photoURL: userToFollow.photoURL || '/assets/user.png',
    city: userToFollow.city || 'unknown city',
    displayName: userToFollow.displayName
  }
  try {
    await firestore.set(
      {
        collection: 'users',
        doc: user.uid,
        subcollections: [{collection: 'following', doc: userToFollow.id}]
      },
      following
    )
  } catch (error) {
    console.log(error)
  }
}

const unfollowUser = userToUnfollow => async (dispatch, getState, {getFirestore}) => {
  const firestore = getFirestore()
  const user = firestore.auth().currentUser
  try {
    await firestore.delete({
      collection: 'users',
      doc: user.uid,
      subcollections: [{collection: 'following', doc: userToUnfollow.id}]
    })
  } catch (error) {
    console.log(error)
  }
}


export {
  uploadPhoto,
  updateProfilePhoto,
  deletePhoto,
  getUserEvents,
  followUser,
  unfollowUser,
}