import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Square from './template/square/square';
const cellArr = [{
  x:4,y:4
},{
  x:5,y:4
},{
  x:4,y:3
},{
  x:4,y:2
}]
var currentSquare;
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentSquare:undefined
    }
  }
  setCurrentSquare(instance){
    currentSquare = instance;
  }
  componentDidMount(){
    this.setState({
      currentSquare:currentSquare
    })
  }
  squareStartDown(){
    this.state.currentSquare.freeDown();
  }
  squareStopDown(){
    this.state.currentSquare.stopOnland();
  }
  render() {
    const squareStartDownFunc = this.squareStartDown.bind(this);
    const squareStopDownFunc = this.squareStopDown.bind(this);
    return (
      <div>
        <div>
          <button type="button" onClick={squareStartDownFunc}>down</button>
          <button type="button" onClick={squareStopDownFunc}>stop</button>
        </div>
        <Square ref={this.setCurrentSquare} cellArr={cellArr}></Square>
      </div>
    )
  }
}
export default App;
