import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from '../../feature/auth/LoginForm'
import RegisterForm from '../../feature/auth/RegisterForm'

function ModalManager(props) {
  const modalLookUp = {
    LoginForm,
    RegisterForm,
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