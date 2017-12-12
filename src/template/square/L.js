import React from 'react';
import Square from './square';
var currSquare;
class L extends Square{
    constructor(props){
        super(props);
        //给L形状的每个格子赋初始值
        this.state = {
            
        }
    }
    //获取以左下角为原点的type类型的形状坐标数组
    getCellArrOfChapeByType(type){
        const Oxy = this.props.Oxy;
        switch(type){
            case 0:{
                return [{x:Oxy.x,y:Oxy.y,shapetype:'L'},
                        {x:Oxy.x+1,y:Oxy.y,shapetype:'L'},
                        {x:Oxy.x,y:Oxy.y-1,shapetype:'L'},
                        {x:Oxy.x,y:Oxy.y-2,shapetype:'L'}]
            }
            case 1:{
                return [{x:Oxy.x,y:Oxy.y,shapetype:'L'},
                        {x:Oxy.x+1,y:Oxy.y,shapetype:'L'},
                        {x:Oxy.x+2,y:Oxy.y,shapetype:'L'},
                        {x:Oxy.x+2,y:Oxy.y-1,shapetype:'L'}]
            }
            case 2:{
                return [{x:Oxy.x+1,y:Oxy.y,shapetype:'L'},
                        {x:Oxy.x+1,y:Oxy.y-1,shapetype:'L'},
                        {x:Oxy.x+1,y:Oxy.y-2,shapetype:'L'},
                        {x:Oxy.x,y:Oxy.y-2,shapetype:'L'}]
            }
            case 3:{
                return [{x:Oxy.x,y:Oxy.y,shapetype:'L'},
                        {x:Oxy.x,y:Oxy.y-1,shapetype:'L'},
                        {x:Oxy.x+1,y:Oxy.y-1,shapetype:'L'},
                        {x:Oxy.x+2,y:Oxy.y-1,shapetype:'L'}]
            }
        }
    }
    freeDownL(){
        currSquare.freeDown();
    }
    stopL(){
        currSquare.stop();
    }
    refCb(instance){
        currSquare = instance;
    }
    render(){
        return <Square ref={this.refCb} cellArr={this.getCellArrOfChapeByType(1)}></Square>
    }
}
export default L;