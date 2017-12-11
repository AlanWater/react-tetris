import React,{ Component } from 'react';
import Cell from './cell';
//方块抽象类
class Square extends Cell{
    constructor(props){
        super(props);
        this.state = {
            downTimer:undefined,
            cellArr:props.cellArr
        }
    }
    //所有方块都有的抽象方法
    //自由下落,方块出场就会自动下落
    freeDown(){
        this.setState({
            downTimer:setInterval(()=>{
                this.setState({
                    cellArr:this.state.cellArr.map((item)=>({
                        x:item.x,
                        y:item.y+1
                    }))
                })
            },1000)
        })
    }
    //落地停止,方块碰到地面会停止运动
    stopOnland(){
        clearInterval(this.state.downTimer);
    }
    //每个方块都会变形
    render(){
        return this.state.cellArr.map((item,idx)=>(<Cell key={idx} x={item.x} y={item.y}></Cell>))
    }
}
export default Square;