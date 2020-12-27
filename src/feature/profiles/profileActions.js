import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECTED_USER_PROFILE, LISTEN_TO_USER_EVENTS,
  LISTEN_TO_USER_PHOTOS, SET_FOLLOW_USER,
} from './profileConstants'

export function listenToCurrentUserProfile(profile) {
  return {
    type: LISTEN_TO_CURRENT_USER_PROFILE,
    payload: profile,
  }
}

export function listenToSelectedUserProfile(profile) {
  return {
    type: LISTEN_TO_SELECTED_USER_PROFILE,
    payload: profile,
  }
}
export function listenToUserPhotos(photos) {
  return {
    type: LISTEN_TO_USER_PHOTOS,
    payload: photos,
  }
}

export function listenToUserEvents(events) {
  return {
    type: LISTEN_TO_USER_EVENTS,
    payload: events,
  }
}

export function setFollowUser() {
  return {
    type: SET_FOLLOW_USER
  }
}

export function setUnFollowUser() {
  return {
    type: SET_FOLLOW_USER
  }
}