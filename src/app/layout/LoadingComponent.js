import React from 'react'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'


const Mask = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
  z-index: 999;
`


function LoadingComponent(props) {
  const {loading} = props.loading
  if (loading === false) {
    return <div />
  }

  return (
    <Mask>
      <div style={{position: 'fixed', left: '50%', top: '50%'}}>
        <CircularProgress size={80}/>
      </div>
    </Mask>
  )
}


const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(LoadingComponent)