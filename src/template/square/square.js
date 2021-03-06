import React from 'react';
import Cell from './cell';
import {DOWN_FRAME,game_panel_h,game_panel_w} from './../../js/config/square.base.config';
import eventEmitter from './../../js/gammer/eventEmitter';
import { ActiveSquare } from './../../js/gammer/common.methods';
//方块抽象类
class Square extends Cell{
    constructor(props){
        super(props);
        let type = Math.random()*4 | 0;
        this.state = {
            type:type,
            cellArr:props.getCellArrByType?props.getCellArrByType(type):()=>([])
        }
        ActiveSquare.setActiveSquareStatus('sleep');
    }
    change(){
        if(!ActiveSquare.isMoving()){ return false; }
        let right = undefined,
            tempArr = this.props.getCellArrByType((this.state.type+1)%4).map((item)=>{
                let tempItem = {
                    x:item.x,
                    y:item.y,
                    shapetype:item.shapetype
                }
                if(!right) right = tempItem
                else{
                    if(tempItem.x>right.x){
                        right = tempItem;
                    }
                }
                return tempItem
            });
        
        while(!!right && (right.x>game_panel_w-1) && !this.props.hasCellValid(tempArr)){
            for(var idx = 0;idx < tempArr.length;idx++){
                tempArr[idx].x--;
            }
        }
        if(right.x<game_panel_w && this.canMove(tempArr)){
            this.setState((preState)=>({
                type:(preState.type+1)%4,
                cellArr:tempArr
            }));
        }
    }
    canMove(to,forward){
        var tempXy,
            flag = true;
        for(var idx=0;idx<to.length;idx++){
            tempXy = to[idx];
            if(tempXy.x<0||tempXy.x>game_panel_w-1||tempXy.y<0){
                flag = false;
                break;
            }
        }
        if(this.props.hasCellValid(to,forward)){
            flag = false;
        }
        if(!flag){
            if(forward === 'down'){
                this.deadAction();
            }
        }else{
            ActiveSquare.setActiveSquareStatus('alive');
        }
        return flag;
    }
    deadAction(){
        eventEmitter.emit('cell.dropOnPanel',this);
    }
    moveState(x,y,forward){
        const tempArr = this.state.cellArr.map((item)=>({
            x:item.x+x,
            y:item.y+y,
            shapetype:item.shapetype
        }))
        if(this.canMove(tempArr,forward)&&ActiveSquare.isMoving()){
            this.setState({
                cellArr:tempArr
            })
        }
    }
    //所有方块都有的抽象方法
    //自由下落,方块出场就会自动下落
    freeDown(timerDesc,timerController){
        if(ActiveSquare.getActiveSquareStatus()==='sleep' || ActiveSquare.isMoving()){
            let speed = ActiveSquare.currentMovingTimerFlag === 'normal'?(1100-ActiveSquare.getSpeedLevel()*100)/DOWN_FRAME:
                                ActiveSquare.currentMovingTimerFlag === 'fast'?(1100-ActiveSquare.getSpeedLevel()*100)/10/DOWN_FRAME:99999;
            ActiveSquare[timerDesc] =  setInterval(()=>{
                                                if(!timerController()){
                                                    return false;
                                                }
                                                this.moveState(0,-1/DOWN_FRAME,'down');
                                            },
                                            speed
                                        );
        }
    }
    //落地停止,方块碰到地面会停止运动
    stop(){
        clearInterval(ActiveSquare.movingTimer);
        clearInterval(ActiveSquare.fastMovingTimer);
    }
    //左移动
    left(){
        if(!ActiveSquare.movingTimer){ return false; }
        this.moveState(-1,0);
    }
    //右移动
    right(){
        if(!ActiveSquare.movingTimer){ return false; }
        this.moveState(1,0);
    }
    shouldComponentUpdate( val ){
        return true;
    }
    componentDidMount(){
        
    }
    componentWillReceiveProps( props ){
        if( props.cellArr ){
            this.setState({cellArr:props.cellArr.map((item)=>(item))});
        }
    }
    render(){
        return this.state.cellArr.map((item,idx)=>(<Cell key={idx} shapetype={item.shapetype} x={item.x} y={item.y}></Cell>))
    }
}
export default Square;