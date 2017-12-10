import React,{ Component } from 'react';
import Cell from './cell';
//方块抽象类
class Square extends Cell{
    constructor(props){
        super(props);
    }
}
export default Square;