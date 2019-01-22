import React, { Component } from 'react'
import { Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { actionCloseModal } from '../../../../action/modalAction'
import RegisterForm from '../../../features/auth/register/RegisterForm'


class RegisterModal extends Component {
  render() {
    return (
      <Modal
        size='mini'
        open={true}
        onClose={this.props.closeModal}
      >
        <Modal.Header>
          Sign up to Re-vents for FREE!
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <RegisterForm/>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

const actions = {
  closeModal: actionCloseModal,
}


export default connect(null, actions)(RegisterModal)