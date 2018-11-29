import { createStore, applyMiddleware, compose, Middleware } from 'redux'
import rootReducer from './../reducer'
import thunk from 'redux-thunk'

export const composeEnhancers = (process.env.NODE_ENV === 'development' && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const configStore = (initialState?: object) => {
  const middlewares: Middleware[] = [thunk]
  const enhancer = composeEnhancers(applyMiddleware(...middlewares))

  const store = createStore(rootReducer, initialState!, enhancer)
  return store
}

const store = configStore()

export default store
