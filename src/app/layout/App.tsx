import Button from '@material-ui/core/Button'
import * as React from 'react';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">

          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">hello world</p>
        <p>this is the typeScript</p>
        <p>this is nice try</p>
        <Button color='primary'>this is a Button</Button>
      </div>
    )
  }
}

export default App;
