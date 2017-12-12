import React,{ Component } from 'react';
import { game_panel_w,game_panel_h,UNIT } from './../config/square.base.config';
import L from './../square/L';
const panelStyle = {
    border:'1px solid #333',
    position:'relative',
    backgroundColor:'#fefefe',
    width:game_panel_w*UNIT+'px',
    height:game_panel_h*UNIT+'px'
}
var currentInstance = {};
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
        
    }
    currentSquareDown(){
        currentInstance.freeDownL();
    }
    currentSquareStop(){
        currentInstance.stopL();
    }
    render(){
        return <div style={panelStyle}>
                  <L ref={this.setCurrentSquare} Oxy={this.state.currentSquare.Oxy}></L>
               </div>
    }
}
export default Panel;