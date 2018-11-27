import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState } from 'src/reducers';

class Test extends React.Component<any, any> {
  render() {
    console.log(this.props)
    return <div>
      {this.props.data}
      good nice
    </div>
  }
}

const mapStateToProps = ({auth}: StoreState) => {
  return {
    data: auth.data,
  }
}

export default connect(mapStateToProps)(Test)
