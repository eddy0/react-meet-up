import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from '../../feature/auth/LoginForm'

function ModalManager(props) {
  const modalLookUp = {
    LoginForm,
  }
  const currentModal = useSelector(state => state.modal)
  let renderedModal = ''
  if (currentModal !== null) {
    const {modalType, modalProps} = currentModal
    const ModalComponent = modalLookUp[modalType]
    renderedModal = <ModalComponent {...modalProps} />
  }
  return (
    <span>
      {renderedModal}
    </span>
  )
}

export default ModalManager