module Pan3d {
    export class TimeUtil {
        static START_TIME: number;
        public static funAry: Array<Function> = new Array;
        public static timefunAry: Array<TimeFunTick> = new Array;
        public static outTimeFunAry: Array<TimeFunOut> = new Array;
        public static time: number = 0;

        public static getTimer(): number {
            return Date.now() - TimeUtil.START_TIME;
        }

        public static getTimerSecond(): number {
            return TimeUtil.getTimer() / 1000;
        }

        private static lastTime: number = 0;
        //标记现在时间
        public static saveNowTime(): void {
            this.lastTime = this.getTimer()
        }
        //得到使用的时间
        public static getUseTime(): number {
            return this.getTimer() - this.lastTime
        }

        public static getZeroTime(nS: number): number {
            var timestamp4: Date = new Date(nS * 1000);
            timestamp4.setHours(0);
            timestamp4.setMinutes(0);
            timestamp4.setSeconds(0);

            return timestamp4.getTime() / 1000;
        }
        /**
        * YYYY-mm-DD HH:MM
        **/
        public static getLocalTime(nS: number): string {


            var timestamp4 = new Date(nS * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00

            return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 5)



        }
        /**
        * YYYY-mm-DD
        **/
        public static getLocalTime0(nS: number): string {


            var timestamp4 = new Date(nS * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00


            return timestamp4.toLocaleDateString().replace(/\//g, "-")



        }

        /**
        * YYYY-mm-DD HH:MM:SS
        **/
        public static getLocalTime1(nS: number): string {


            var timestamp4 = new Date(nS * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00


            return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8)



        }

        /**
         * HH:MM:SS
        **/
        public static getLocalTime2(nS: number): string {


            // var timestamp4 = new Date(nS * 1000 - 8 * 60 * 60 * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00
            var timestamp4 = new Date(nS * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00
            ////console.log("--time=",timestamp4.toTimeString());
            return timestamp4.toTimeString().substr(0, 8)

        }
        /**
         * HH:MM
        **/
        public static getLocalTime6(nS: number): string {
            // var timestamp4 = new Date(nS * 1000 - 8 * 60 * 60 * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00
            var timestamp4 = new Date(nS * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00
            //console.log("--time=",timestamp4.toTimeString());
            return timestamp4.toTimeString().substr(0, 5)

        }

        /**
         * MM:SS
        **/
        public static getLocalTime3(nS: number): string {


            var timestamp4 = new Date(nS * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00

            return timestamp4.toTimeString().substr(3, 5)

        }
        /**
         * MM分SS秒
         */
        public static getLocalTime4(nS: number): string {
            return float2int(nS / 60) + "分" + (nS % 60) + "秒";
        }
        /**
         * HH时MM分SS秒
         */
        public static getLocalTime5(nS: number): string {
            var timestamp4 = new Date(nS * 1000);
            var str = timestamp4.toTimeString().substr(0, 8)
            var strAry = str.split(":");
            return strAry[0] + "时" + strAry[1] + "分" + strAry[2] + "秒";
        }
        public static dayTime: number = 24 * 60 * 60;
        public static HourTime: number = 60 * 60;
        public static MinuteTime: number = 60;
        /**
         * 时间差转换
         * DD天HH时MM分SS秒
         */
        public static getDiffTime1(nS: number): string {

            var day: number = float2int(nS / this.dayTime);
            nS -= day * this.dayTime;
            var hour: number = float2int(nS / this.HourTime);
            nS -= hour * this.HourTime;
            var minus: number = float2int(nS / this.MinuteTime);
            nS -= minus * this.MinuteTime;

            return day + "天" + hour + "时" + minus + "分" + nS + "秒";

        }

        /**
         * HH:MM:SS
        **/
        public static getDiffTime2(nS: number): string {
            var hour: number = float2int(nS / this.HourTime);
            nS -= hour * this.HourTime;
            var minus: number = float2int(nS / this.MinuteTime);
            nS -= minus * this.MinuteTime;
            return this.zeroStr(hour) + ":" + this.zeroStr(minus) + ":" + this.zeroStr(nS);
        }

        public static zeroStr(num: number): string {
            if (num > 9) {
                return String(num);
            } else {
                return "0" + num;
            }
        }

        public static getDelayTimeStr($hourtime: number): string {
            var hourtime: number = Math.floor($hourtime / 3600)

            var timeStr: string = "";
            if (hourtime > 24) {
                timeStr = Math.floor(hourtime / 24) + "天前";
            } else {
                if (hourtime >= 1) {
                    timeStr = hourtime + "小时前";
                } else {
                    timeStr = "刚刚";
                }
            }
            return timeStr;
        }

        public static compareTime($hour: number, $min: number): boolean {
            //服务器当前标准时间

            return false;
        }



        public static init(): void {
            TimeUtil.START_TIME = Date.now();
        }


        public static addTimeTick($time: number, $fun: Function, $beginTime: number = 0): void {
            var timeFunTick: TimeFunTick = new TimeFunTick();
            timeFunTick.alltime = $time;
            timeFunTick.fun = $fun;
            timeFunTick.time = $time - $beginTime;
            TimeUtil.timefunAry.push(timeFunTick);
        }

        public static removeTimeTick($fun: Function): void {
            for (var i: number = 0; i < TimeUtil.timefunAry.length; i++) {
                if (TimeUtil.timefunAry[i]) {
                    if (TimeUtil.timefunAry[i].fun == $fun) {
                        //TimeUtil.timefunAry.splice(i, 1);
                        TimeUtil.timefunAry[i] = null;
                        break;
                    }
                } else {
                    // throw Error("有重复移除嫌疑");	
                }
            }
        }

        public static addTimeOut($time: number, $fun: Function): void {
            if (this.hasTimeOut($fun)) {
                return;
            }
            var timeFunTick: TimeFunOut = new TimeFunOut();
            timeFunTick.alltime = $time;
            timeFunTick.fun = $fun;
            timeFunTick.time = 0;
            TimeUtil.outTimeFunAry.push(timeFunTick);
        }

        public static removeTimeOut($fun: Function): void {
            for (var i: number = 0; i < TimeUtil.outTimeFunAry.length; i++) {

                if (TimeUtil.outTimeFunAry[i] && TimeUtil.outTimeFunAry[i].fun == $fun) {
                    //TimeUtil.outTimeFunAry.splice(i, 1);
                    TimeUtil.outTimeFunAry[i] = null;
                    break;
                }

            }
        }

        public static hasTimeOut($fun: Function): boolean {
            for (var i: number = 0; i < TimeUtil.outTimeFunAry.length; i++) {

                if (TimeUtil.outTimeFunAry[i] && TimeUtil.outTimeFunAry[i].fun == $fun) {
                    return true;
                }

            }
            return false;
        }



        public static addFrameTick($fun: Function): void {
            if (TimeUtil.funAry.indexOf($fun) == -1) {
                TimeUtil.funAry.push($fun);
            }
        }

        public static hasFrameTick($fun: Function): boolean {
            var index: number = TimeUtil.funAry.indexOf($fun);
            if (index != -1) {
                return true;
            }
            return false;
        }

        public static removeFrameTick($fun: Function): void {
            var index: number = TimeUtil.funAry.indexOf($fun);
            if (index != -1) {
                TimeUtil.funAry[index] = null;
                //TimeUtil.funAry.splice(index, 1);
            }
        }

        public static update(): void {
            var dtime: number = TimeUtil.getTimer() - TimeUtil.time;

            for (var i: number = 0; i < TimeUtil.funAry.length; i++) {
                if (TimeUtil.funAry[i]) {
                    TimeUtil.funAry[i](dtime);
                }
            }


            for (var i: number = 0; i < TimeUtil.timefunAry.length; i++) {
                if (TimeUtil.timefunAry[i]) {
                    TimeUtil.timefunAry[i].update(dtime);
                }
            }

            for (var i: number = TimeUtil.outTimeFunAry.length - 1; i >= 0; i--) {
                if (TimeUtil.outTimeFunAry[i] && TimeUtil.outTimeFunAry[i].update(dtime)) {
                    TimeUtil.outTimeFunAry[i] = null;
                }
            }

            for (var i: number = TimeUtil.funAry.length - 1; i >= 0; i--) {
                if (!TimeUtil.funAry[i]) {
                    TimeUtil.funAry.splice(i, 1);
                }
            }

            for (var i: number = TimeUtil.timefunAry.length - 1; i >= 0; i--) {
                if (!TimeUtil.timefunAry[i]) {
                    TimeUtil.timefunAry.splice(i, 1);
                }
            }

            for (var i: number = TimeUtil.outTimeFunAry.length - 1; i >= 0; i--) {
                if (!TimeUtil.outTimeFunAry[i]) {
                    TimeUtil.outTimeFunAry.splice(i, 1);
                }
            }



            TimeUtil.time = TimeUtil.getTimer();
        }

    }

    class TimeFunTick {
        public alltime: number = 0;
        public time: number = 0;
        public fun: Function;
        public update(t: number): void {
            this.time += t;
            if (this.time >= this.alltime) {
                this.fun();
                this.time = 0;
            }
        }
    }

    class TimeFunOut {
        public alltime: number = 0;
        public time: number = 0;
        public fun: Function;
        public update(t: number): boolean {
            this.time += t;
            if (this.time >= this.alltime) {
                this.fun();
                return true;
            }
            return false;
        }
    }


}