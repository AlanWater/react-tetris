import React, { Component } from 'react';
import './App.css';
import Panel from './template/ground/panel';
import Score from './template/ground/score';
import eventEmitter from './js/gammer/eventEmitter';
import { ActiveSquare } from './js/gammer/common.methods';
var panelRef;
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      score:0
    }
    this.addScore = this.addScore.bind(this);
  }
  componentDidMount(){
    eventEmitter.addListener('game.addScore',this.addScore);
  }
  refCb(instance){
    panelRef = instance;
  }
  squareStartDown(){
      ActiveSquare.setActiveSquareStatus('sleep');
      ActiveSquare.initTimer();
      panelRef.currentSquareDown(); // 释放下落状态
  }
  squareStopDown(){
    ActiveSquare.setActiveSquareStatus('sleep');
    panelRef.currentSquareStop();
  }
  addScore( score ){
    this.setState((preState)=>({
      score:preState.score+score
    }))
  }
  render() {
    const squareStartDownFunc = this.squareStartDown.bind(this);
    const squareStopDownFunc = this.squareStopDown.bind(this);
    return (
      <div>
        <div>
          <button type="button" onClick={squareStartDownFunc}>start</button>
          <button type="button" onClick={squareStopDownFunc}>stop</button>
          <Score score={this.state.score}/>
        </div>
        <Panel class="panel" ref={this.refCb}></Panel>
      </div>
    )
  }
}
export default App;
