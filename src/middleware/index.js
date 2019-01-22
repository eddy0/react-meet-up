import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import {reduxFirestore, getFirestore} from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

const rrfConfig = {
  useProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,

}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewareEnhancer = composeEnhancers(
  applyMiddleware(
    thunk.withExtraArgument({getFirebase, getFirestore}),
  ),
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)

export default middlewareEnhancer