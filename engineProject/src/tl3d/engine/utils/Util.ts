namespace tl3d {
    export class Util {
        static float2int(value): number {
            return value | 0;
        }

        static radian2angle(value: number): number {
            return value / Math.PI * 180;
        }

        static angle2radian(value: number): number {
            return value / 180 * Math.PI;
        }
        static makeImage(): any {
            var _img: any = new Image();
            _img.setAttribute("crossOrigin", "anonymous");
            return _img
        }

        static hexToArgb(expColor: number, is32: boolean = true, color: tl3d.Vector3D = null): tl3d.Vector3D {
            if (!color) {
                color = new tl3d.Vector3D();
            }
            color.w = is32 ? (expColor >> 24) & 0xFF : 0;
            color.x = (expColor >> 16) & 0xFF;
            color.y = (expColor >> 8) & 0xFF;
            color.z = (expColor) & 0xFF;
            return color;
        }

        static hexToArgbNum(expColor: number, is32: boolean = true, color: tl3d.Vector3D = null): tl3d.Vector3D {
            color = Util.hexToArgb(expColor, is32, color);
            color.scaleBy(1 / 0xFF);
            return color;
        }

        static getBaseUrl(): string {
            if (tl3d.Scene_data.supportBlob) {
                return "";
            } else {
                return "_base";
            }
        }

                /**描边路径 */
        static strokeFilter(ctx: CanvasRenderingContext2D, width: number, height: number, color: number): void {
            var colorVec: tl3d.Vector3D = Util.hexToArgb(color);
            var imgData: ImageData = ctx.getImageData(0, 0, width, height);
            var data = imgData.data;

            var targetAry: Array<number> = new Array;
            for (var i: number = 1; i < width - 1; i++) {
                for (var j: number = 0; j < height - 1; j++) {
                    var idx: number = getPiexIdx(i, j);
                    if (data[idx + 3] == 0) {
                        if (getAround(i, j)) {

                            targetAry.push(idx);
                        }
                    }

                }
            }
            for (var i: number = 0; i < targetAry.length; i++) {
                data[targetAry[i]] = colorVec.x;
                data[targetAry[i] + 1] = colorVec.y;
                data[targetAry[i] + 2] = colorVec.z;
                data[targetAry[i] + 3] = colorVec.w;
            }

            ctx.putImageData(imgData, 0, 0);

            var getPiexIdx=function(x, y): number {
                return ((y * width) + x) * 4;
            }

            var getAround=function(x, y): boolean {

                var idx: number
                idx = getPiexIdx(x - 1, y);
                if (data[idx + 3] > 0) {
                    return true;
                }
                idx = getPiexIdx(x + 1, y);
                if (data[idx + 3] > 0) {
                    return true;
                }
                idx = getPiexIdx(x, y + 1);
                if (data[idx + 3] > 0) {
                    return true;
                }
                idx = getPiexIdx(x, y - 1);
                if (data[idx + 3] > 0) {
                    return true;
                }
                // idx = getPiexIdx(x - 1, y+1);
                // if (data[idx + 3] > 0) {
                //     return true;
                // }
                // idx = getPiexIdx(x + 1, y+1);
                // if (data[idx + 3] > 0) {
                //     return true;
                // }
                // idx = getPiexIdx(x - 1, y-1);
                // if (data[idx + 3] > 0) {
                //     return true;
                // }
                // idx = getPiexIdx(x + 1, y-1);
                // if (data[idx + 3] > 0) {
                //     return true;
                // }
                return false;
            }

        }

        static trim(s) {
            return Util.trimRight(Util.trimLeft(s));
        }
        //去掉左边的空白  
        static trimLeft(s) {
            if (s == null) {
                return "";
            }
            var whitespace = new String(" \t\n\r");
            var str = new String(s);
            if (whitespace.indexOf(str.charAt(0)) != -1) {
                var j = 0, i = str.length;
                while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
                    j++;
                }
                str = str.substring(j, i);
            }
            return str;
        }

        //去掉右边的空白 www.2cto.com   
        static trimRight(s) {
            if (s == null) return "";
            var whitespace = new String(" \t\n\r");
            var str = new String(s);
            if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
                var i = str.length - 1;
                while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
                    i--;
                }
                str = str.substring(0, i + 1);
            }
            return str;
        }


        static getScencdStr(timeNum: number): string {
            var m: number = Math.floor((timeNum / 60 % 60));
            var s: number = Math.floor(timeNum % 60);
            return String(m < 10 ? "0" : "") + String(m) + ":" + String(s < 10 ? "0" : "") + String(s);
        }

        static random($num: number): number {
            return Math.floor(Math.random() * $num);
        }
        static randomByItem(arr: Array<any>): any {
            return arr[Util.random(arr.length)]
        }
        /**
         * 同时获得多个指定区间的随机数
         * 从min到max中随机much个数
         * 包括min
         * 不包括max
         */
        static getRandomNumAssgin($much: number, $min: number, $max: number) {
            let posArray: Array<number> = new Array;
            let ary: Array<number> = new Array;
            for (let i = $min; i < $max; i++) {
                ary.push(i);
            }
            for (var i = 0; i < $much; i++) {
                if ($max > i) {
                    let randomid: number = Util.random(ary.length);
                    let retAry = ary.splice(randomid, 1);
                    posArray.push(retAry[0]);
                }
            }
            return posArray;
        }
        static makeArray(a: Array<any>, b: Array<any>): void {
            if (!a) {
                //console.log("有错")
            }
            for (var i: number = 0; i < a.length; i++) {
                b.push(a[i])
            }
        }


        static unZip($aryBuf: ArrayBuffer): ArrayBuffer {
            var compressed: Uint8Array = new Uint8Array($aryBuf);
            //var t = Date.now();
            var inflate = new Zlib.Inflate(compressed);
            var plain: Uint8Array = inflate.decompress();
            ////console.log("解压obj",Date.now()-t);
            return plain.buffer;


        }


        static getZipByte($byte: tl3d.TLByteArray): tl3d.TLByteArray {
            var zipLen: number = $byte.readInt();
            var aryBuf: ArrayBuffer = $byte.buffer.slice($byte.position, $byte.position + zipLen);
            $byte.position += zipLen;
            var zipedBuf: ArrayBuffer = Util.unZip(aryBuf)
            return new tl3d.TLByteArray(zipedBuf)
        }


        static getUrlParam(name: string): string {
            if (window['wx']) { //小游戏不获取浏览器参数
                return null;
            }
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);

            if (r != null) {
                return decodeURI(r[2]);
            } else {
                return null;
            }
        }

        static copy2clipboard(val: string): void {
            var inputui: HTMLTextAreaElement = document.createElement("textarea")
            //inputui.type = "text";
            inputui.style.fontSize = '12pt';
            inputui.style.position = "absolute";
            inputui.style["z-index"] = -1;

            inputui.style.background = "transparent"
            inputui.style.border = "transparent"
            inputui.style.color = "white";
            inputui.setAttribute('readonly', '');

            document.body.appendChild(inputui);

            inputui.value = val;

            inputui.select();
            inputui.setSelectionRange(0, inputui.value.length);

            try {
                document.execCommand('copy');
            } catch (error) {
                alert("不支持复制");
            }

            setTimeout(function () {
                document.body.removeChild(inputui);
            }, 1000);


        }

        static getBit($num: number, offset: number): boolean {
            return (Boolean)($num >> (offset & 31) & 1);
        }
    }
}