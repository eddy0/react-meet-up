import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import { actionOpenModal } from '../../action/modalAction'
import { connect } from 'react-redux'

class TestComponent extends Component {
  render() {
    return (
      <div>
        <Button onClick={() => this.props.openModal('TestModal', {data: 1})}> open</Button>
      </div>
    )
  }
}

const actions = {
  openModal: actionOpenModal
}

export default connect(null, actions)(TestComponent)