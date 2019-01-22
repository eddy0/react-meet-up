import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { actionCloseModal } from '../../../../action/modalAction'
import LoginForm from '../../../features/auth/login/LoginForm'


class LoginModal extends Component {
  render() {
    return (
      <Modal
        size='mini'
        open={true}
        onClose={this.props.closeModal}
      >
        <Modal.Header>
          Login to Re-vents
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LoginForm/>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

const actions = {
  closeModal: actionCloseModal,
}


export default connect(null, actions)(LoginModal)