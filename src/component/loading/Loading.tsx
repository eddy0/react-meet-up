import * as React from 'react'
import { StoreState } from './../../reducer/index'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

export interface LoadingProps {
  loading: boolean
}

const Mask = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #ccc;
  z-index: 999;
`

class Loading extends React.Component<LoadingProps> {
  render() {
    const { loading } = this.props
    if (loading === false) {
      return <div></div>
    }

    return (
      <Mask>
        <div style={{ position: 'fixed', left: '50%', top: '50%' }}>
          <CircularProgress size={80} />
        </div>
      </Mask>
    )
  }
}

const mapStateToProps = (state: StoreState) => {
  console.log(state.loading)
  return {
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(Loading)
