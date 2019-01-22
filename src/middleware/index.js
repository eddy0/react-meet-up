import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { getFirestore} from 'redux-firestore'
import {  getFirebase } from 'react-redux-firebase'

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
  // reactReduxFirebase(firebase, rrfConfig),
  // reduxFirestore(firebase, rrfConfig)
)

export {rrfConfig}
export default middlewareEnhancer