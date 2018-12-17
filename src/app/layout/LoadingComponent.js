import React from 'react'
import { Spin } from 'antd'
import { connect } from 'react-redux'

function LoadingComponent(props) {
  return (
    <div className='loading'>
      <Spin size='large' spinning={props.loading}/>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    loading: state.loading,
  }
}

export default connect(mapStateToProps)(LoadingComponent)