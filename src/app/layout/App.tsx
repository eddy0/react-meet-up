// import Button from '@material-ui/core/Button'
import * as React from 'react';
import EventDashboard from 'src/features/event/EventDashboard/EventDashboard';
import NavBar from 'src/features/nav/NavBar/NavBar';
import './App.css';
class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <NavBar />
        <header className="App-header">
          <h1 className="App-title">Welcome to Event</h1>
        </header>
        <EventDashboard />
      </div>
    )
  }
}

export default App;
