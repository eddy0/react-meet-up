import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import TestModal from './TestModal'

const modalMapper = {
  TestModal: TestModal
}

class ModalHoc extends Component {
  render() {
    const {currentModal} = this.props
    let renderComponent
    if (currentModal) {
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