var Pan3d;
(function (Pan3d) {
    var TimeUtil = /** @class */ (function () {
        function TimeUtil() {
        }
        TimeUtil.getTimer = function () {
            return (Date.now() - TimeUtil.START_TIME);
        };
        TimeUtil.getTimerSecond = function () {
            return TimeUtil.getTimer() / 1000;
        };
        //标记现在时间
        TimeUtil.saveNowTime = function () {
            this.lastTime = this.getTimer();
        };
        //得到使用的时间
        TimeUtil.getUseTime = function () {
            return this.getTimer() - this.lastTime;
        };
        TimeUtil.getZeroTime = function (nS) {
            var timestamp4 = new Date(nS * 1000);
            timestamp4.setHours(0);
            timestamp4.setMinutes(0);
            timestamp4.setSeconds(0);
            return timestamp4.getTime() / 1000;
        };
        /**
        * YYYY-mm-DD HH:MM
        **/
        TimeUtil.getLocalTime = function (nS) {
            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
            return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 5);
        };
        /**
        * YYYY-mm-DD
        **/
        TimeUtil.getLocalTime0 = function (nS) {
            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
            return timestamp4.toLocaleDateString().replace(/\//g, "-");
        };
        /**
        * YYYY-mm-DD HH:MM:SS
        **/
        TimeUtil.getLocalTime1 = function (nS) {
            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
            return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
        };
        /**
         * HH:MM:SS
        **/
        TimeUtil.getLocalTime2 = function (nS) {
            // var timestamp4 = new Date(nS * 1000 - 8 * 60 * 60 * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00
            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
            ////console.log("--time=",timestamp4.toTimeString());
            return timestamp4.toTimeString().substr(0, 8);
        };
        /**
         * HH:MM
        **/
        TimeUtil.getLocalTime6 = function (nS) {
            // var timestamp4 = new Date(nS * 1000 - 8 * 60 * 60 * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00
            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
            //console.log("--time=",timestamp4.toTimeString());
            return timestamp4.toTimeString().substr(0, 5);
        };
        /**
         * MM:SS
        **/
        TimeUtil.getLocalTime3 = function (nS) {
            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
            return timestamp4.toTimeString().substr(3, 5);
        };
        /**
         * MM分SS秒
         */
        TimeUtil.getLocalTime4 = function (nS) {
            return float2int(nS / 60) + "分" + (nS % 60) + "秒";
        };
        /**
         * HH时MM分SS秒
         */
        TimeUtil.getLocalTime5 = function (nS) {
            var timestamp4 = new Date(nS * 1000);
            var str = timestamp4.toTimeString().substr(0, 8);
            var strAry = str.split(":");
            return strAry[0] + "时" + strAry[1] + "分" + strAry[2] + "秒";
        };
        /**
         * 时间差转换
         * DD天HH时MM分SS秒
         */
        TimeUtil.getDiffTime1 = function (nS) {
            var day = float2int(nS / this.dayTime);
            nS -= day * this.dayTime;
            var hour = float2int(nS / this.HourTime);
            nS -= hour * this.HourTime;
            var minus = float2int(nS / this.MinuteTime);
            nS -= minus * this.MinuteTime;
            return day + "天" + hour + "时" + minus + "分" + nS + "秒";
        };
        /**
         * HH:MM:SS
        **/
        TimeUtil.getDiffTime2 = function (nS) {
            var hour = float2int(nS / this.HourTime);
            nS -= hour * this.HourTime;
            var minus = float2int(nS / this.MinuteTime);
            nS -= minus * this.MinuteTime;
            return this.zeroStr(hour) + ":" + this.zeroStr(minus) + ":" + this.zeroStr(nS);
        };
        TimeUtil.zeroStr = function (num) {
            if (num > 9) {
                return String(num);
            }
            else {
                return "0" + num;
            }
        };
        TimeUtil.getDelayTimeStr = function ($hourtime) {
            var hourtime = Math.floor($hourtime / 3600);
            var timeStr = "";
            if (hourtime > 24) {
                timeStr = Math.floor(hourtime / 24) + "天前";
            }
            else {
                if (hourtime >= 1) {
                    timeStr = hourtime + "小时前";
                }
                else {
                    timeStr = "刚刚";
                }
            }
            return timeStr;
        };
        TimeUtil.compareTime = function ($hour, $min) {
            //服务器当前标准时间
            return false;
        };
        TimeUtil.init = function () {
            TimeUtil.START_TIME = Date.now();
        };
        TimeUtil.addTimeTick = function ($time, $fun, $beginTime) {
            if ($beginTime === void 0) { $beginTime = 0; }
            var timeFunTick = new TimeFunTick();
            timeFunTick.alltime = $time;
            timeFunTick.fun = $fun;
            timeFunTick.time = $time - $beginTime;
            TimeUtil.timefunAry.push(timeFunTick);
        };
        TimeUtil.removeTimeTick = function ($fun) {
            for (var i = 0; i < TimeUtil.timefunAry.length; i++) {
                if (TimeUtil.timefunAry[i]) {
                    if (TimeUtil.timefunAry[i].fun == $fun) {
                        //TimeUtil.timefunAry.splice(i, 1);
                        TimeUtil.timefunAry[i] = null;
                        break;
                    }
                }
                else {
                    // throw Error("有重复移除嫌疑");	
                }
            }
        };
        TimeUtil.addTimeOut = function ($time, $fun) {
            if (this.hasTimeOut($fun)) {
                return;
            }
            var timeFunTick = new TimeFunOut();
            timeFunTick.alltime = $time;
            timeFunTick.fun = $fun;
            timeFunTick.time = 0;
            TimeUtil.outTimeFunAry.push(timeFunTick);
        };
        TimeUtil.removeTimeOut = function ($fun) {
            for (var i = 0; i < TimeUtil.outTimeFunAry.length; i++) {
                if (TimeUtil.outTimeFunAry[i] && TimeUtil.outTimeFunAry[i].fun == $fun) {
                    //TimeUtil.outTimeFunAry.splice(i, 1);
                    TimeUtil.outTimeFunAry[i] = null;
                    break;
                }
            }
        };
        TimeUtil.hasTimeOut = function ($fun) {
            for (var i = 0; i < TimeUtil.outTimeFunAry.length; i++) {
                if (TimeUtil.outTimeFunAry[i] && TimeUtil.outTimeFunAry[i].fun == $fun) {
                    return true;
                }
            }
            return false;
        };
        TimeUtil.addFrameTick = function ($fun) {
            if (TimeUtil.funAry.indexOf($fun) == -1) {
                TimeUtil.funAry.push($fun);
            }
        };
        TimeUtil.hasFrameTick = function ($fun) {
            var index = TimeUtil.funAry.indexOf($fun);
            if (index != -1) {
                return true;
            }
            return false;
        };
        TimeUtil.removeFrameTick = function ($fun) {
            var index = TimeUtil.funAry.indexOf($fun);
            if (index != -1) {
                TimeUtil.funAry[index] = null;
                //TimeUtil.funAry.splice(index, 1);
            }
        };
        TimeUtil.update = function () {
            var dtime = TimeUtil.getTimer() - TimeUtil.time;
            for (var i = 0; i < TimeUtil.funAry.length; i++) {
                if (TimeUtil.funAry[i]) {
                    TimeUtil.funAry[i](dtime);
                }
            }
            for (var i = 0; i < TimeUtil.timefunAry.length; i++) {
                if (TimeUtil.timefunAry[i]) {
                    TimeUtil.timefunAry[i].update(dtime);
                }
            }
            for (var i = TimeUtil.outTimeFunAry.length - 1; i >= 0; i--) {
                if (TimeUtil.outTimeFunAry[i] && TimeUtil.outTimeFunAry[i].update(dtime)) {
                    TimeUtil.outTimeFunAry[i] = null;
                }
            }
            for (var i = TimeUtil.funAry.length - 1; i >= 0; i--) {
                if (!TimeUtil.funAry[i]) {
                    TimeUtil.funAry.splice(i, 1);
                }
            }
            for (var i = TimeUtil.timefunAry.length - 1; i >= 0; i--) {
                if (!TimeUtil.timefunAry[i]) {
                    TimeUtil.timefunAry.splice(i, 1);
                }
            }
            for (var i = TimeUtil.outTimeFunAry.length - 1; i >= 0; i--) {
                if (!TimeUtil.outTimeFunAry[i]) {
                    TimeUtil.outTimeFunAry.splice(i, 1);
                }
            }
            TimeUtil.time = TimeUtil.getTimer();
        };
        TimeUtil.funAry = new Array;
        TimeUtil.timefunAry = new Array;
        TimeUtil.outTimeFunAry = new Array;
        TimeUtil.time = 0;
        TimeUtil.lastTime = 0;
        TimeUtil.dayTime = 24 * 60 * 60;
        TimeUtil.HourTime = 60 * 60;
        TimeUtil.MinuteTime = 60;
        return TimeUtil;
    }());
    Pan3d.TimeUtil = TimeUtil;
    var TimeFunTick = /** @class */ (function () {
        function TimeFunTick() {
            this.alltime = 0;
            this.time = 0;
        }
        TimeFunTick.prototype.update = function (t) {
            this.time += t;
            if (this.time >= this.alltime) {
                this.fun();
                this.time = 0;
            }
        };
        return TimeFunTick;
    }());
    var TimeFunOut = /** @class */ (function () {
        function TimeFunOut() {
            this.alltime = 0;
            this.time = 0;
        }
        TimeFunOut.prototype.update = function (t) {
            this.time += t;
            if (this.time >= this.alltime) {
                this.fun();
                return true;
            }
            return false;
        };
        return TimeFunOut;
    }());
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=TimeUtil.js.map