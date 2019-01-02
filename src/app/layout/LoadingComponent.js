import React from 'react'
import { connect } from 'react-redux'
import { Dimmer, Loader } from 'semantic-ui-react'



function LoadingComponent(props) {
  const {loading} = props.loading
  if (loading === false) {
    return <div />
  }

  return (
     <Dimmer active={true}>
      <Loader content='Loading...'/>
    </Dimmer>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(LoadingComponent)