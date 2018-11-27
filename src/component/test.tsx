import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState } from 'src/reducers';
import { handleIncrement } from 'src/reducers/auth';

class Test extends React.Component<any, any> {

  handleClick = () => {
    this.props.handleIncrement()
  }

  render() {
    console.log(this.props)
    return <div>
      {this.props.data}
      good nice
      <button onClick={this.handleClick}>click</button>
    </div>
  }
}

const mapStateToProps = ({auth}: StoreState) => {
  return {
    data: auth.data,
  }
}


export default connect(mapStateToProps, {handleIncrement})(Test)
