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