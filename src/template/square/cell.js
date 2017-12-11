import React,{ Component } from 'react';
import squareBaseCofnig from './../config/square.base.config';
//所有俄罗斯方块的外形均由4个小方块构成这是一个俄罗斯方块构成基本的抽象
class Cell extends Component{
    constructor(props){
        super(props);
        //每个小方块的基本属性，x：x轴坐标，y：y轴坐标，w：宽度，h：高度
        const state = {
            
            w:squareBaseCofnig.cell_w,
            h:squareBaseCofnig.cell_h
        }

        this.state = state;
    }
    componentWillReceiveProps(nextProps){
        
    }
    render(){
        const style={
            position:'absolute',
            left:this.props.x*squareBaseCofnig.cell_w+'px',
            top:this.props.y*squareBaseCofnig.cell_h+'px',
            width:squareBaseCofnig.cell_w+'px',
            height:squareBaseCofnig.cell_h+'px',
            border:'1px solid #ddd'
        }
        return <div style={style}></div>
    }
}
export default Cell;