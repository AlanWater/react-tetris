import React, { Component } from 'react';
import './App.css';
import Panel from './template/ground/panel';
import Score from './template/ground/score';
import { gameStatus }from './js/config/square.base.config';
import eventEmitter from './js/gammer/eventEmitter';
var panelRef;
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gameStatus:gameStatus.SLEEP,
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
