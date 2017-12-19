import React, { Component } from 'react';
import './App.css';
import Panel from './template/gammer/panel';
import { gameStatus }from './template/config/square.base.config';
var panelRef;
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameStatus:gameStatus.SLEEP
    }
  }
  refCb(instance){
    panelRef = instance;
  }
  isGameActive(){
    return this.state.gameStatus === gameStatus.ACTIVE;
  }
  squareStartDown(){
    if(!this.isGameActive()){
      this.setState({
        gameStatus:gameStatus.ACTIVE
      });
      panelRef.currentSquareDown();
    }
  }
  squareStopDown(){
    this.setState({
      gameStatus:gameStatus.PAUSE
    })
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
        <Panel class="panel" ref={this.refCb}></Panel>
      </div>
    )
  }
}
export default App;
