import React from 'react';
import Cell from './cell';
import {DOWN_FRAME,game_panel_h,game_panel_w} from './../config/square.base.config';
//方块抽象类
class Square extends Cell{
    constructor(props){
        super(props);
        this.state = {
            downTimer:undefined,
            cellArr:this.props.cellArr,
            downSpeed:1
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
        if(!flag){
            if(forward === 'down'){
                this.stop();
            }else if(forward === 'right'){

            }
        }
        return flag;
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
            },(900-this.state.downSpeed*100)/DOWN_FRAME)
        })
    }
    //落地停止,方块碰到地面会停止运动
    stop(){
        clearInterval(this.state.downTimer);
    }
    //左移动
    left(){
        this.moveState(-1,0);
    }
    //右移动
    right(){
        this.moveState(1,0);
    }
    //重置下落行为
    resetDown(){
        this.stop();
        this.freeDown();
    }
    //快速下落
    setDownSpeed( downSpeed ){
        if(!this.state.downTimer) return;
        this.setState({
            downSpeed
        })
        this.resetDown();
    }
    shouldComponentUpdate( val ){
        return true;
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