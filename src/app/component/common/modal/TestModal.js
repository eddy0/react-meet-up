import React from 'react'
import { Modal } from 'semantic-ui-react'
import { actionCloseModal } from '../../../../action/modalAction'
import { connect } from 'react-redux'

function TestModal(props) {
  return (
    <Modal closeIcon="close" open={true} onClose={props.closeModal}>
      <Modal.Header>Test Modal</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>Test Modal... nothing to see here </p>
          <p>{props.data}</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

const actions = {
  closeModal: actionCloseModal,
}


export default connect(null, actions)(TestModal)