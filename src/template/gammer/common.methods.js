export const getOxy = ( arr ) => {
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
export var ActiveSquare = {
    status:'birthing',
    movingTimer:undefined,
    downSpeed:1,
    getActiveSquareStatus(){
        return this.status;
    },
    setActiveSquareStatus( status ){
        this.status = status;
    },
    isMoving(){
        return this.status === 'deading' || this.status === 'alive';
    },
    getDownSpeed(){
        return this.downSpeed;
    },
    setDownSpeed( downSpeed ){
        this.downSpeed = downSpeed;
    }
}