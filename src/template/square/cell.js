import React,{ Component } from 'react';
import {cell_h,cell_w,UNIT} from './../config/square.base.config';
//所有俄罗斯方块的外形均由4个小方块构成这是一个俄罗斯方块构成基本的抽象
class Cell extends Component{
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps){
        
    }
    render(){
        const style={
            position:'absolute',
            left:this.props.x*cell_w*UNIT+'px',
            top:this.props.y*cell_h*UNIT+'px',
            width:cell_w*UNIT+'px',
            height:cell_h*UNIT+'px'
        }
        return <div className={this.props.shapetype} style={style}></div>
    }
}
export default Cell;