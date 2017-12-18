//方块基本配置
        
 const  UNIT = 30, //基本长度单位
        cell_w = 1, //小方块宽度 单位为1 UNIT
        cell_h = 1, //小方块高度 单位为1 UNIT
        game_panel_h = 20, //游戏屏幕的高度,单位为1 UNIT
        game_panel_w = 10, //游戏屏幕的宽度,单位为1 UNIT
        NORMAL_DOWN_SPEED = 1, //下落速度初始为1
        FAST_DOWN_SPEED = 10, //快速下落速度为8
        gameStatus = { //游戏状态集合
            SLEEP:'sleep', //沉睡
            ACTIVE:'active', //活动
            PAUSE:'pause', //暂停
            GAME_OVER:'gameover' //游戏结束
        },
        DOWN_FRAME = 26; //下落帧数
export  {UNIT,cell_w,cell_h,game_panel_h,game_panel_w,NORMAL_DOWN_SPEED,FAST_DOWN_SPEED,gameStatus,DOWN_FRAME}