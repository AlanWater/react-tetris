import React from 'react';
import Square from './square';
var currSquare,
    Oxy;
class L extends Square{
    constructor(props){
        super(props);
        this.state = {
            type:Math.random()*4 | 0
        }
        Oxy = this.props.Oxy;
    }
    //获取以左下角为原点的type类型的形状坐标数组
    getCellArrOfChapeByType(type){
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
    freeDown(){
        currSquare.freeDown();
    }
    stop(){
        currSquare.stop();
    }
    left(){
        currSquare.left();
    }
    right(){
        currSquare.right();
    }
    setDownSpeed( speed ){
        currSquare.setDownSpeed( speed );
    }
    getOxy( arr ){
        let minX=9999;
        let maxY=-1;
        arr.map((item)=>{
            minX = minX>item.x?item.x:minX;
            maxY = maxY<item.y?item.y:maxY;
        })
        return {
            x:minX,
            y:maxY
        }
    }
    change(){
        this.setState((preState)=>({
            type:(preState.type+1)%4
        }));
    }
    componentWillUpdate(){
        Oxy = this.getOxy(currSquare.state.cellArr)
    }
    refCb(instance){
        currSquare = instance;
    }
    render(){
        return <Square ref={this.refCb} cellArr={this.getCellArrOfChapeByType(this.state.type)}></Square>
    }
}
export default L;