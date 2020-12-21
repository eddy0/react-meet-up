import React from 'react'
import { Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { openModal } from '../../common/modals/modalReducer'

const SignedOutMenu = () => {
  const dispatch = useDispatch()
  return (
    <>
      <Button basic={true} inverted={true} content={'Login'}  onClick={() => dispatch(openModal({modalType: 'LoginForm'}))} />
      <Button basic={true} inverted={true} content={'Reigster'}  style={{marginLeft: '0.5em'}} />
    </>
  )
}

export default SignedOutMenu