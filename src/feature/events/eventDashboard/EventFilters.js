import React from 'react'
import { Header, Menu } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

function EventFilters(props) {
  return (
    <>
      <Menu
        vertical
        size={'large'}
        style={{width: '100%'}}
      >
        <Header icon={'filter'} attached color={'teal'} content={'Filters'} />
        <Menu.Item content={'All Event'} />
        <Menu.Item content={'going'} />
        <Menu.Item content={'hosting'} />
      </Menu>
      <Header  icon={'calendar'} attached color={'teal'} content={'Calendar'}/>
      <Calendar  />
    </>
  )
}

export default EventFilters