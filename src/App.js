import React, { Component } from 'react';
import './App.css';
import Panel from './template/gammer/panel';
var panelRef;
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
  refCb(instance){
    panelRef = instance;
  }
  squareStartDown(){
    panelRef.currentSquareDown();
  }
  squareStopDown(){
    panelRef.currentSquareStop();
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
        <Panel ref={this.refCb}></Panel>
      </div>
    )
  }
}
export default App;
