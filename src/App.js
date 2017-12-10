import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './template/square/cell'
class Square extends Cell{
  constructor(props){
      super(props);
  }
};
class App extends Component {
  render() {
    return (
      <Square x="1" y="2"></Square>
    )
  }
}
export default App;
