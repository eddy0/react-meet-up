import createReducer from './utils'
import { MODAL_CLOSE, MODAL_OPEN } from '../action/modalAction'


const openModal = (state={}, action) => {
  const {modalType, modalProps} = action.payload
  return {
    modalType,
    modalProps
  }
}

const closeModal = (state={}, action) => {
  return {}
}

export default createReducer({}, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal,
})