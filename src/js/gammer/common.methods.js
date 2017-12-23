export const getOxy = ( arr ) => {
    let minX=9999;
    let minY=9999;
    arr.map((item)=>{
        minX = minX>item.x?item.x:minX;
        minY = minY>item.y?item.y:minY;
    })
    return {
        x:minX,
        y:minY
    }
}
export var ActiveSquare = {
    status:'birthing',
    movingTimer:undefined,
    fastMovingTimer:undefined,
    currentMovingTimerFlag:'normal',
    speedLevel:1,
    getActiveSquareStatus(){
        return this.status;
    },
    setActiveSquareStatus( status ){
        this.status = status;
    },
    isMoving(){
        return this.status === 'deading' || this.status === 'alive';
    },
    getSpeedLevel(){
        return this.speedLevel;
    },
    setSpeedLevel(speedLevel){
        this.speedLevel = speedLevel;
    },
    initTimer(){
        this.movingTimer = undefined;
        this.fastMovingTimer = undefined;
        this.currentMovingTimerFlag = 'normal';
    }
}