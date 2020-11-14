export declare class TimeUtil {
    static START_TIME: number;
    static funAry: Array<Function>;
    static timefunAry: Array<TimeFunTick>;
    static outTimeFunAry: Array<TimeFunOut>;
    static time: number;
    static getTimer(): number;
    static getTimerSecond(): number;
    private static lastTime;
    static saveNowTime(): void;
    static getUseTime(): number;
    static getZeroTime(nS: number): number;
    /**
    * YYYY-mm-DD HH:MM
    **/
    static getLocalTime(nS: number): string;
    /**
    * YYYY-mm-DD
    **/
    static getLocalTime0(nS: number): string;
    /**
    * YYYY-mm-DD HH:MM:SS
    **/
    static getLocalTime1(nS: number): string;
    /**
     * HH:MM:SS
    **/
    static getLocalTime2(nS: number): string;
    /**
     * HH:MM
    **/
    static getLocalTime6(nS: number): string;
    /**
     * MM:SS
    **/
    static getLocalTime3(nS: number): string;
    /**
     * MM分SS秒
     */
    static getLocalTime4(nS: number): string;
    /**
     * HH时MM分SS秒
     */
    static getLocalTime5(nS: number): string;
    static dayTime: number;
    static HourTime: number;
    static MinuteTime: number;
    /**
     * 时间差转换
     * DD天HH时MM分SS秒
     */
    static getDiffTime1(nS: number): string;
    /**
     * HH:MM:SS
    **/
    static getDiffTime2(nS: number): string;
    static zeroStr(num: number): string;
    static getDelayTimeStr($hourtime: number): string;
    static compareTime($hour: number, $min: number): boolean;
    static init(): void;
    static addTimeTick($time: number, $fun: Function, $beginTime?: number): void;
    static removeTimeTick($fun: Function): void;
    static addTimeOut($time: number, $fun: Function): void;
    static removeTimeOut($fun: Function): void;
    static hasTimeOut($fun: Function): boolean;
    static addFrameTick($fun: Function): void;
    static hasFrameTick($fun: Function): boolean;
    static removeFrameTick($fun: Function): void;
    static update(): void;
}
declare class TimeFunTick {
    alltime: number;
    time: number;
    fun: Function;
    update(t: number): void;
}
declare class TimeFunOut {
    alltime: number;
    time: number;
    fun: Function;
    update(t: number): boolean;
}
export {};
