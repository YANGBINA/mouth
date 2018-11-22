import React, { Component } from 'react';
import Create from  './components/create.js'
import  List from  './components/list.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Create/>
       <List />
      </div>
    );
  }
}

export default App;
