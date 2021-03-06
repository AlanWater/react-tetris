import React from 'react';
import Square from './square';
import { getOxy } from './../../js/gammer/common.methods';
var currSquare,
    Oxy;
class T extends Square{
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
            case 0:{
                return [{x:Oxy.x,y:Oxy.y,shapetype:'T'},
                        {x:Oxy.x+1,y:Oxy.y,shapetype:'T'},
                        {x:Oxy.x+2,y:Oxy.y,shapetype:'T'},
                        {x:Oxy.x+1,y:Oxy.y+1,shapetype:'T'}]
            }
            case 1:{
                return [{x:Oxy.x+1,y:Oxy.y,shapetype:'T'},
                        {x:Oxy.x,y:Oxy.y+1,shapetype:'T'},
                        {x:Oxy.x+1,y:Oxy.y+1,shapetype:'T'},
                        {x:Oxy.x+1,y:Oxy.y+2,shapetype:'T'}]
            }
            case 2:{
                return [{x:Oxy.x+1,y:Oxy.y,shapetype:'T'},
                        {x:Oxy.x,y:Oxy.y+1,shapetype:'T'},
                        {x:Oxy.x+1,y:Oxy.y+1,shapetype:'T'},
                        {x:Oxy.x+2,y:Oxy.y+1,shapetype:'T'}]
            }
            case 3:{
                return [{x:Oxy.x,y:Oxy.y,shapetype:'T'},
                        {x:Oxy.x,y:Oxy.y+1,shapetype:'T'},
                        {x:Oxy.x+1,y:Oxy.y+1,shapetype:'T'},
                        {x:Oxy.x,y:Oxy.y+2,shapetype:'T'}]
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
export default T;