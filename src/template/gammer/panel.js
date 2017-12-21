import React,{ Component } from 'react';
import { game_panel_w,game_panel_h,UNIT,FAST_DOWN_SPEED,NORMAL_DOWN_SPEED } from './../config/square.base.config';
import { I,J,L,S,Z,O,T } from './../gammer/square.base';
import Cell from './../square/cell';
import { keymap } from './../config/panel.keymap.config';
import eventEmitter from './../gammer/eventEmitter';
const panelStyle = {
    border:'1px solid #333',
    position:'relative',
    backgroundColor:'#fefefe',
    width:game_panel_w*UNIT+'px',
    height:game_panel_h*UNIT+'px',
    overflow:'hidden'
}
var currentInstance = {},
    fastDownFlag = false,
    squareArr = [I,J,L,S,Z,O,T],
    initCurrentSquare = {
        Oxy:{
            x:game_panel_w/2-2,
            y:0
        }
    },
    currentSquareIdx = Math.random()*7|0,
    nextActiveFlag = false;
class Panel extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentSquare:initCurrentSquare,
            cellMap:[]
        }
    }
    nextActiveSquare(){
        this.setState({
            currentSquare:initCurrentSquare
        });
        nextActiveFlag = true;
        currentSquareIdx = Math.random()*7|0;
        currentInstance.freeDown();
        // eventEmitter.emit('square.rebirth');
    }
    setCurrentSquare(instance){
        currentInstance = instance;
    }
    shouldComponentUpdate(){
        return true;
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
        this.cellDropOnLandEmitter = eventEmitter.addListener('cell.dropOnPanel',( cellArr )=>{
            this.addPanelCell(cellArr);
            this.nextActiveSquare();
        })
        this.thePlaceHasCell = this.thePlaceHasCell.bind(this);
    }
    componentWillUnMount(){
        eventEmitter.removeListener(this.cellDropOnLandEmitter);
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
    showCellMap(){
        return this.state.cellMap.map((rowCell,rowIdx)=>{
            return rowCell.map((cell,idx)=>{
                return <Cell x={cell.x} y={cell.y} shapetype={"panelCell"} key={cell.y+":"+cell.x}></Cell>
            })
        })
    }
    addPanelCell( cellArr ){
        let tempCellArr = [];
        this.setState((preState)=>{
            let tempCell,
                tempY;
            tempCellArr = preState.cellMap.map((item)=>(item));
            for(var idx=0;idx<cellArr.length;idx++){
                tempCell = cellArr[idx];
                tempY = Math.ceil(tempCell.y);
                if(tempCellArr[tempY] === undefined){
                    tempCellArr[tempY] = [];
                }
                tempCellArr[tempY][tempCell.x] = tempCell;
            }
            return {
                cellMap:tempCellArr
            };
        })
    }
    thePlaceHasCell( cellArr,forward ){
        let tempCell,
            tempY;

        for(var idx=0;idx<cellArr.length;idx++){
            tempCell = cellArr[idx];
            tempY = Math.ceil(tempCell.y);
            if(!!this.state.cellMap[tempY]){
                if(!!this.state.cellMap[tempY][tempCell.x]||(!!this.state.cellMap[tempY-1]&&!!this.state.cellMap[tempY-1][tempCell.x])){
                    return true;
                }
            }
        }
        return false;
    }
    randomActiveSquare( currentSquareIdx ){
        let InstanceSquare = squareArr[currentSquareIdx];
        return <InstanceSquare ref={this.setCurrentSquare} hasCellValid={this.thePlaceHasCell} Oxy={this.state.currentSquare.Oxy}/>;
    }
    render(){
        return <div style={panelStyle}>
                  {this.randomActiveSquare(currentSquareIdx)}
                  {this.showCellMap()}
               </div>
    }
}
export default Panel;