import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import TestModal from './TestModal'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

const modalMapper = {
  TestModal: TestModal,
  RegisterModal,
  LoginModal,
}

class ModalHoc extends Component {
  render() {
    const {currentModal} = this.props
    let renderComponent
    if (Object.keys(currentModal).length > 0) {
      const {modalType, modalProps} = currentModal
      const ModalComponent = modalMapper[modalType]
      renderComponent = <ModalComponent {...modalProps} />
    }
    return (
      <span>
        {renderComponent}
      </span>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    currentModal: state.modal
  }
}

export default connect(mapStateToProps)(ModalHoc)