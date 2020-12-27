import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'
import { verifyAuth } from '../../feature/auth/authActions'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()


export function configureStore() {
  const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(thunk)))
  store.dispatch(verifyAuth())

  return store
}
