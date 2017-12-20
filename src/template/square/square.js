import React from 'react';
import Cell from './cell';
import {DOWN_FRAME,game_panel_h,game_panel_w} from './../config/square.base.config';
import eventEmitter from './../gammer/eventEmitter';
var initAliveStatus = 'sleep';
//方块抽象类
class Square extends Cell{
    constructor(props){
        super(props);
        let type = Math.random()*4 | 0;
        this.state = {
            downTimer:undefined,
            downSpeed:1,
            type:type,
            cellArr:props.getCellArrByType?props.getCellArrByType(type):()=>([]),
            aliveStatus:initAliveStatus
        }
        // this.rebirth = this.rebirth.bind(this);
    }
    change(){
        if(this.state.aliveStatus==='dead'||this.state.aliveStatus==='sleep'){ return false; }
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
        if(right.x<game_panel_w){
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
            if(tempXy.x<0||tempXy.x>game_panel_w-1||tempXy.y>game_panel_h-1){
                flag = false;
                break;
            }
        }
        if(this.props.hasCellValid(this.state.cellArr)){
            flag = false;
        }
        if(!flag){
            if(forward === 'down'){
                this.stop();
                this.setState({
                    aliveStatus:'deading'
                });
                this.deadingAction();
            }
        }else{
            this.setState({
                aliveStatus:'alive'
            });
        }
        return flag;
    }
    // rebirth(){
    //     this.setState({
    //         aliveStatus:'sleep'
    //     });
    // }
    deadingAction(){
        setTimeout(()=>{
            this.setState({
                aliveStatus:'dead'
            });
            eventEmitter.emit('cell.dropOnPanel',this.state.cellArr);                                    
        },(1100-this.state.downSpeed*100));
    }
    moveState(x,y,forward){
        const tempArr = this.state.cellArr.map((item)=>({
            x:item.x+x,
            y:item.y+y,
            shapetype:item.shapetype
        }))
        if(this.canMove(tempArr,forward)){
            this.setState({
                cellArr:tempArr
            })
        }
    }
    //所有方块都有的抽象方法
    //自由下落,方块出场就会自动下落
    freeDown(){
        this.setState({
            downTimer:setInterval(()=>{
                this.moveState(0,1/DOWN_FRAME,'down');
            },(1100-this.state.downSpeed*100)/DOWN_FRAME)
        })
    }
    //落地停止,方块碰到地面会停止运动
    stop(){
        clearInterval(this.state.downTimer);
    }
    //左移动
    left(){
        if(!this.state.downTimer){ return false; }
        this.moveState(-1,0);
    }
    //右移动
    right(){
        if(!this.state.downTimer){ return false; }
        this.moveState(1,0);
    }
    //重置下落行为
    resetDown(){
        this.stop();
        this.freeDown();
    }
    //快速下落
    setDownSpeed( downSpeed ){
        if(!this.state.downTimer){ return false; }
        this.setState({
            downSpeed
        })
        this.resetDown();
    }
    shouldComponentUpdate( val ){
        return true;
    }
    componentDidMount(){
        //eventEmitter.addListener('square.rebirth',this.rebirth);
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