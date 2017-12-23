import React,{ Component } from 'react';
import { game_panel_w,game_panel_h,UNIT,FAST_DOWN_SPEED,NORMAL_DOWN_SPEED } from './../../js/config/square.base.config';
import { I,J,L,S,Z,O,T } from './../../js/gammer/square.base';
import Cell from './../square/cell';
import { keymap } from './../../js/config/panel.keymap.config';
import eventEmitter from './../../js/gammer/eventEmitter';
import { ActiveSquare } from './../../js/gammer/common.methods';
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
            y:game_panel_h-1
        }
    },
    currentSquareIdx = Math.random()*7|0;
class Panel extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentSquare:this.randomActiveSquare( currentSquareIdx ),
            cellMap:[]
        }
    }
    setActiveSleep2Down(){
        ActiveSquare.setActiveSquareStatus('sleep');
        ActiveSquare.initTimer();
        this.currentSquareDown(); // 释放下落状态
    }
    nextActiveSquare(){
        if(ActiveSquare.getActiveSquareStatus()==='dead'){ //当前方块死亡时才会生产新的方块
            ActiveSquare.setActiveSquareStatus('birthing'); //下一个方块出生中
            currentSquareIdx = Math.random()*7|0;
            this.setState({ // 产生新的下落方块
                currentSquare:this.randomActiveSquare( currentSquareIdx )
            },this.setActiveSleep2Down)
        }
    }
    setCurrentSquare(instance){
        currentInstance = instance;
    }
    shouldComponentUpdate(){
        return true;
    }
    componentDidUpdate(){
        
    }
    componentDidMount(){
        // this.thePlaceHasCell = this.thePlaceHasCell.bind(this);
        document.addEventListener('keydown',(event)=>{
            if(!ActiveSquare.isMoving()){ //只有当方块处于活动状态的时候才可以进行键盘操作
                return false;
            }
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
                    if(ActiveSquare.currentMovingTimerFlag==='normal'){
                        ActiveSquare.currentMovingTimerFlag = 'fast';
                    }
                    if(!ActiveSquare.fastMovingTimer){
                        currentInstance.freeDown('fastMovingTimer',()=>{
                            if(ActiveSquare.currentMovingTimerFlag==='normal'){
                                return false;
                            }
                            return true;
                        });
                    }
                    break;
                }
            }
        })
        document.addEventListener('keyup',(event)=>{
            if(!ActiveSquare.isMoving()){ //只有当方块处于活动状态的时候才可以进行键盘操作
                return false;
            }
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
                    if(ActiveSquare.currentMovingTimerFlag==='fast'){
                        ActiveSquare.currentMovingTimerFlag = 'normal';
                    }
                    break;
                }
            }
        })
        this.cellDropOnLandEmitter = eventEmitter.addListener('cell.dropOnPanel',( deadSquareInstance )=>{
            deadSquareInstance.stop(); //停止下落
            ActiveSquare.setActiveSquareStatus('dead'); //当前方块设置为dead
            this.addPanelCell(deadSquareInstance.state.cellArr); //方块加入地板
            this.nextActiveSquare(); //下一个方块
        })
    }
    componentWillUnMount(){
        eventEmitter.removeListener(this.cellDropOnLandEmitter);
    }
    currentSquareDown(){
        currentInstance.freeDown('movingTimer',()=>{
            if(ActiveSquare.currentMovingTimerFlag==='fast'){
                return false;
            }
            return true;
        });
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
            if(!!rowCell){
                return rowCell.map((cell,idx)=>{
                    return <Cell x={cell.x} y={cell.y} shapetype={"panelCell"} key={cell.y+":"+cell.x}></Cell>
                })
            }
        })
    }
    addPanelCell( cellArr ){
        this.setState((preState)=>{
            let tempCell,
                tempY,
                delArr =[],
                tempCellArr = [],
                tempCellArr2,
                delFlag = false,
                scoreToAdd = 0,
                scoreHelper = 1;
            tempCellArr = preState.cellMap.map((item)=>(item));
            //加入新方块刀地板
            for(var idx=0;idx<cellArr.length;idx++){
                tempCell = cellArr[idx];
                tempY = Math.ceil(tempCell.y);
                if(tempCellArr[tempY] === undefined){
                    tempCellArr[tempY] = [];
                }
                tempCellArr[tempY][tempCell.x] = tempCell;
            }
            //消除行判定
            for(idx=tempCellArr.length-1;idx>=0;idx--){
                let temp = tempCellArr[idx]||[],
                    len = 0;
                if(temp.length===0){
                    continue;
                }
                for(let jdx=0;jdx<temp.length;jdx++){
                    if(!!temp[jdx]){
                        len++;
                    }
                }
                if(len===game_panel_w){
                    scoreToAdd+=scoreHelper;
                    scoreHelper++;
                    tempCellArr.splice(idx,1);
                }
            }
            //重置y轴位置
            for(idx=tempCellArr.length-1;idx>=0;idx--){
                let temp = tempCellArr[idx]||[];
                if(temp.length===0){
                    continue;
                }
                for(let jdx=0;jdx<temp.length;jdx++){
                    if(!!temp[jdx]){
                        temp[jdx].y = idx;
                    }
                }
            }
            
            eventEmitter.emit('game.addScore',scoreToAdd);

            return {
                cellMap:tempCellArr
            };
        })
    }
    thePlaceHasCell( cellArr,forward ){
        let tempCell,
            tempY,
            moveFlag;
        for(var idx=0;idx<cellArr.length;idx++){
            tempCell = cellArr[idx];
            tempY = Math.ceil(tempCell.y);
            moveFlag = tempY === tempCell.y;
            if(!!this.state.cellMap[tempY]){
                if(!!this.state.cellMap[tempY][tempCell.x]||(!moveFlag&&!!this.state.cellMap[tempY-1]&&!!this.state.cellMap[tempY-1][tempCell.x])){
                    return true;
                }
            }
        }
        return false;
    }
    randomActiveSquare( currentSquareIdx ){
        let InstanceSquare = squareArr[currentSquareIdx];
        return <InstanceSquare ref={this.setCurrentSquare} hasCellValid={this.thePlaceHasCell.bind(this)} Oxy={initCurrentSquare.Oxy}/>;
    }
    render(){
        return <div style={panelStyle}>
                  {this.state.currentSquare}
                  {this.showCellMap()}
               </div>
    }
}
export default Panel;