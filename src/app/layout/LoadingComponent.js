import React from 'react'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'

class LoadingComponent extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.loading &&
          <Dimmer active={true}>
            <Loader content='Loading...'/>
          </Dimmer>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(LoadingComponent)