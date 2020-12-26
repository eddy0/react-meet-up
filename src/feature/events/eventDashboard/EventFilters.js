import React from 'react'
import { Header, Menu } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

function EventFilters({predicate, setPredicate, loading}) {
  return (
    <>
      <Menu
        vertical
        size={'large'}
        style={{width: '100%'}}
      >
        <Header icon={'filter'} attached color={'teal'} content={'Filters'}/>
        <Menu.Item content={'All Event'}
                   active={predicate.get('filter') === 'all'}
                   onClick={() => setPredicate('filter', 'all')}
                   disabled={loading}
        />
        <Menu.Item content={'going'}
                   active={predicate.get('filter') === 'isGoing'}
                   onClick={() => setPredicate('filter', 'isGoing')}
                   disabled={loading}
        />
        <Menu.Item content={'hosting'}
                   active={predicate.get('filter') === 'isHosting'}
                   onClick={() => setPredicate('filter', 'isHosting')}
                   disabled={loading}
        />
      </Menu>
      <Header icon={'calendar'} attached color={'teal'} content={'Calendar'}/>
      <Calendar onChange={date => setPredicate('startDate', date)}
                value={predicate.get('startDate') || new Date()}
                tileDisabled={() => loading}/>
    </>
  )
}

export default EventFilters