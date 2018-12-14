import React, { Component } from 'react'
import { Button } from 'antd'

class Eventform extends Component {


  handleSubmit = (e) => {
    console.log('submit',e)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Button htmlType={'submit'} >click</Button>
        </form>

      </div>
    )
  }
}

export default Eventform