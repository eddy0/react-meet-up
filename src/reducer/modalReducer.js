import createReducer from './utils'
import { MODAL_CLOSE, MODAL_OPEN } from '../action/modalAction'


const initialState = null

const openModal = (state, action) => {
  const {modalType, modalProps} = action.payload
  return {
    modalType,
    modalProps
  }
}

const closeModal = (state, action) => {
  const {modalType, modalProps} = action.payload
  return null
}

export default createReducer(initialState, {
  [MODAL_OPEN]: openModal,
  [MODAL_CLOSE]: closeModal,
})