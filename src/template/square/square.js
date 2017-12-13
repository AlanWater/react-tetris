import React from 'react';
import Cell from './cell';
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
    //所有方块都有的抽象方法
    //自由下落,方块出场就会自动下落
    freeDown(){
        this.setState({
            downTimer:setInterval(()=>{
                this.setState({
                    cellArr:this.state.cellArr.map((item)=>({
                        x:item.x,
                        y:item.y+1,
                        shapetype:item.shapetype
                    }))
                })
            },1100-this.state.downSpeed*100)
        })
    }
    //落地停止,方块碰到地面会停止运动
    stop(){
        clearInterval(this.state.downTimer);
    }
    //左移动
    left(){
        this.setState({
            cellArr:this.state.cellArr.map((item)=>({
                x:item.x-1,
                y:item.y,
                shapetype:item.shapetype
            }))
        })
    }
    //右移动
    right(){
        this.setState({
            cellArr:this.state.cellArr.map((item)=>({
                x:item.x+1,
                y:item.y,
                shapetype:item.shapetype
            }))
        })
    }
    //重置下落行为
    resetDown(){
        this.stop();
        this.freeDown();
    }
    //快速下落
    setDownSpeed( downSpeed ){
        console.log(this.state.downTimer);
        if(!this.state.downTimer) return;
        this.setState({
            downSpeed
        })
        this.resetDown();
    }
    shouldComponentUpdate( val ){
        return true;
    }
    //每个方块都会变形
    render(){
        return this.state.cellArr.map((item,idx)=>(<Cell key={idx} shapetype={item.shapetype} x={item.x} y={item.y}></Cell>))
    }
}
export default Square;