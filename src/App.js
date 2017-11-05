import React, { Component } from 'react';
import Games from './Components/Games'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        My App
        <Games />
      </div>
    );
  }
}

export default App;
