import React from 'react';
import Square from './square';
import { getOxy } from './../../js/gammer/common.methods';
var currSquare,
    Oxy;
class O extends Square{
    constructor(props){
        super(props);
        Oxy = this.props.Oxy;
    }
    //获取以左下角为原点的type类型的形状坐标数组
    getCellArrOfChapeByType(type){
        if(!!currSquare){
            Oxy = getOxy(currSquare.state.cellArr);
        }
        switch(type){
            default:{
                return [{x:Oxy.x,y:Oxy.y,shapetype:'O'},
                        {x:Oxy.x+1,y:Oxy.y,shapetype:'O'},
                        {x:Oxy.x,y:Oxy.y+1,shapetype:'O'},
                        {x:Oxy.x+1,y:Oxy.y+1,shapetype:'O'}]
            }
        }
    }
    freeDown(timerDesc,controller){
        currSquare.freeDown(timerDesc,controller);
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
    change(){
        currSquare.change();
    }
    componentWillUpdate(){
        
    }
    refCb(instance){
        currSquare = instance;
    }
    render(){
        return <Square 
                    ref={this.refCb} 
                    hasCellValid={this.props.hasCellValid} 
                    getCellArrByType={this.getCellArrOfChapeByType}>
               </Square>
    }
}
export default O;