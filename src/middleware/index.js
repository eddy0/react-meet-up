import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { getFirestore, reduxFirestore} from 'redux-firestore'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import firebase from '../config/firebase'

const rrfConfig = {
  useProfile: 'users',
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewareEnhancer = composeEnhancers(
  applyMiddleware(
    thunk.withExtraArgument({ getFirebase, getFirestore }),
  ),
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase, rrfConfig)
)

export {rrfConfig}
export default middlewareEnhancer