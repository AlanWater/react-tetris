import React,{ Component } from 'react';
import squareBaseCofnig from './../config/square.base.config';
//所有俄罗斯方块的外形均由4个小方块构成这是一个俄罗斯方块构成基本的抽象
class Cell extends Component{
    constructor(props){
        super(props);
        //每个小方块的基本属性，x：x轴坐标，y：y轴坐标，w：宽度，h：高度
        const state = {
            x:this.props.x,
            y:this.props.y,
            w:squareBaseCofnig.cell_w,
            h:squareBaseCofnig.cell_h
        }
        this.abc = () => {}
        this.state = state;
    }
    //小方块可以左右移动，往下移动。左右移动按键控制，往下移动有正常自动下落速度和按键快速下落
    down(){
        console.log(123456);
        this.setState((preState, props) => ({
            y: preState.y + 1
        }))
    }
    left(){
        this.setState((preState, props) => ({
            x: preState.x - 1
        }))
    }
    right(){
        this.setState((preState, props) => ({
            x: preState.x + 1
        }))
    }
    render(){
        const style={
            position:'absolute',
            left:this.state.x*squareBaseCofnig.cell_w+'px',
            top:this.state.y*squareBaseCofnig.cell_h+'px',
            width:squareBaseCofnig.cell_w+'px',
            height:squareBaseCofnig.cell_h+'px',
            border:'1px solid #ddd'
        }
        return <div style={style}></div>
    }
}
export default Cell;