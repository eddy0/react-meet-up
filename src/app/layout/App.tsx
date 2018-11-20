import * as React from 'react';
import EventDashboard from 'src/features/event/EventDashboard/EventDashboard';
import NavBar from 'src/features/nav/NavBar/NavBar';
import './App.css';
class App extends React.Component {

  public render() {
    return (
      <div className="App">
        <NavBar />
        <EventDashboard />
      </div>
    )
  }
}

export default App;
