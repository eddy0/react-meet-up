import { createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import rootReducer from './rootReducer'

const reducer = () => {
  return {
    data: 10,
  }
}



export function configureStore() {
  return createStore(rootReducer, devToolsEnhancer())
}
