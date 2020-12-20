import React from 'react'
import { Button } from 'semantic-ui-react'

const SignedOutMenu = ({setAuthenticated}) => {
  return (
    <>
      <Button basic={true} inverted={true} content={'Login'}  onClick={() => setAuthenticated(true)} />
      <Button basic={true} inverted={true} content={'Reigster'}  style={{marginLeft: '0.5em'}} />
    </>
  )
}

export default SignedOutMenu