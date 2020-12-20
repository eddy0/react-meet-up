import React from 'react'
import { Button, Dropdown, Image, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SignedInMenu = ({handleSignOut}) => {
  return (
    <>
     <Image avatar spaced={'right'} src={'assets/user.png'} />
     <Dropdown pointing={'top left'} text={'bob'}>
       <Dropdown.Menu>
         <Dropdown.Item  as={Link} to={'/createEvent'} text={'create Event'} icon={'plus'} />
         <Dropdown.Item  as={Link} to={'/createEvent'} text={'profile'} icon={'user'} />
         <Dropdown.Item  text={'logout'} icon={'power'} onClick={handleSignOut} />
       </Dropdown.Menu>
     </Dropdown>
    </>
  )
}

export default SignedInMenu