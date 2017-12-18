import React,{ Component } from 'react';
import { game_panel_w,game_panel_h,UNIT,FAST_DOWN_SPEED,NORMAL_DOWN_SPEED } from './../config/square.base.config';
import L from './../square/L';
import { keymap } from './../config/panel.keymap.config';
const panelStyle = {
    border:'1px solid #333',
    position:'relative',
    backgroundColor:'#fefefe',
    width:game_panel_w*UNIT+'px',
    height:game_panel_h*UNIT+'px'
}
var currentInstance = {},
    fastDownFlag = false;
class Panel extends Component{
    constructor(props){
        super(props);
        this.state = {
            squareArr:[],
            currentSquare:{
                Oxy:{
                    x:game_panel_w/2-2,
                    y:0
                }
            }
        }
    }
    setCurrentSquare(instance){
        currentInstance = instance;
    }
    componentDidMount(){
        document.addEventListener('keydown',(event)=>{
            switch(keymap[event.key]){
                case 'up':{
                    this.currentSquareChange();
                    break;
                }
                case 'left':{
                    this.currentSquareLeft();
                    break;
                }
                case 'right':{
                    this.currentSquareRight();
                    break;
                }
                case 'down':{
                    if(!fastDownFlag){
                        fastDownFlag = true;
                        currentInstance.setDownSpeed( FAST_DOWN_SPEED );
                    }
                    break;
                }
            }
        })
        document.addEventListener('keyup',(event)=>{
            switch(keymap[event.key]){
                case 'up':{
                    break;
                }
                case 'left':{
                    break;
                }
                case 'right':{
                    break;
                }
                case 'down':{
                    fastDownFlag = false;
                    currentInstance.setDownSpeed( NORMAL_DOWN_SPEED );
                    break;
                }
            }
        })
    }
    currentSquareDown(){
        currentInstance.freeDown();
    }
    currentSquareStop(){
        currentInstance.stop();
    }
    currentSquareLeft(){
        currentInstance.left();
    }
    currentSquareRight(){
        currentInstance.right();
    }
    currentSquareChange(){
        currentInstance.change();
    }
    render(){
        return <div style={panelStyle}>
                  <L ref={this.setCurrentSquare} Oxy={this.state.currentSquare.Oxy}></L>
               </div>
    }
}
export default Panel;