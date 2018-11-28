import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState } from 'src/reducers';
import {handleDecrement,  handleIncrement } from 'src/reducers/auth';

class Test extends React.Component<any, any> {

  render() {
    console.log(this.props)
    return <div>
      {this.props.data}
      good nice
      <button onClick={this.props.handleIncrement}>increase</button>
      <button onClick={this.props.handleDecrement}>decrease</button>
    </div>
  }
}

const mapStateToProps = ({auth}: StoreState) => {
  return {
    data: auth.data,
  }
}


export default connect(mapStateToProps, {handleIncrement, handleDecrement})(Test)
