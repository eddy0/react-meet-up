import {message} from 'antd'

const actionAddComment = (eventId, values, parentId, replyTo) => async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        const profile = getState().firebase.profile
        const user = firebase.auth().currentUser
        let newComment = {
            parentId: parentId,
            displayName: profile.displayName,
            photoURL: profile.photoURL || '/assets/user.png',
            uid: user.uid,
            text: values.comment,
            date: Date.now(),
            replyTo: replyTo ? {displayName: replyTo.displayName, replyToId: replyTo.id } : null,
        }
    console.log('newComment', newComment)

    try {
            await firebase.push(`chat/${eventId}`, newComment)
        } catch(e) {
            console.log('e', e)
        }
    }

export {
    actionAddComment,
}