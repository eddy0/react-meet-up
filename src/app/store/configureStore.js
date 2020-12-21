import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

const reducer = () => {
  return {
    data: 10,
  }
}



export function configureStore() {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
}
