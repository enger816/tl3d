function float2int(value) {
    return value | 0;
}

function radian2angle(value: number): number {
    return value / Math.PI * 180;
}

function angle2radian(value: number): number {
    return value / 180 * Math.PI;
}
function makeImage(): any {
    var _img: any = new Image();
    _img.setAttribute("crossOrigin", "anonymous");
    return _img
}

var keyChi: Array<string> = [
    "零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二", "十三", "十四", "十五"
];
/**阿拉伯数字转换成中文数字 */
function getChiNum($id: number): string {
    return keyChi[$id];
}
function hexToArgb(expColor: number, is32: boolean = true, color: Pan3d.Vector3D = null): Pan3d. Vector3D {
    if (!color) {
        color = new Pan3d. Vector3D();
    }
    color.w = is32 ? (expColor >> 24) & 0xFF : 0;
    color.x = (expColor >> 16) & 0xFF;
    color.y = (expColor >> 8) & 0xFF;
    color.z = (expColor) & 0xFF;
    return color;
}

function hexToArgbNum(expColor: number, is32: boolean = true, color: Pan3d.Vector3D = null): Pan3d. Vector3D {
    color = hexToArgb(expColor, is32, color);
    color.scaleBy(1 / 0xFF);
    return color;
}

function getBaseUrl(): string {
    if (Pan3d.Scene_data.supportBlob) {
        return "";
    } else {
        return "_base";
    }
}
/**描边路径 */
function strokeFilter(ctx: CanvasRenderingContext2D, width: number, height: number, color: number): void {
    var colorVec: Pan3d.Vector3D = hexToArgb(color);
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

    function getPiexIdx(x, y): number {
        return ((y * width) + x) * 4;
    }

    function getAround(x, y): boolean {

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
function trim(s) {
    return trimRight(trimLeft(s));
}
//去掉左边的空白  
function trimLeft(s) {
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
function trimRight(s) {
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


function TweenMoveTo(taget: any, t: number, vars: any): void {
  
}


function getScencdStr(timeNum: number): string {
    var m: number = Math.floor((timeNum / 60 % 60));
    var s: number = Math.floor(timeNum % 60);
    return String(m < 10 ? "0" : "") + String(m) + ":" + String(s < 10 ? "0" : "") + String(s);
}

//function trace(message?: any, ...optionalParams: any[]): void {
//    //console.log(message, ...optionalParams);
//}
function random($num: number): number {
    return Math.floor(Math.random() * $num);
}
function randomByItem(arr: Array<any>): any {
    return arr[random(arr.length)]
}
function makeArray(a: Array<any>, b: Array<any>): void {
    if (!a) {
        //console.log("有错")
    }
    for (var i: number = 0; i < a.length; i++) {
        b.push(a[i])
    }
}


function unZip($aryBuf: ArrayBuffer): ArrayBuffer {
    var compressed: Uint8Array = new Uint8Array($aryBuf);
    //var t = Date.now();
    var inflate = new Zlib.Inflate(compressed);
    var plain: Uint8Array = inflate.decompress();
    ////console.log("解压obj",Date.now()-t);
    return plain.buffer;


}


function getZipByte($byte: Pan3d.Pan3dByteArray): Pan3d. Pan3dByteArray {
    var zipLen: number = $byte.readInt();
    var aryBuf: ArrayBuffer = $byte.buffer.slice($byte.position, $byte.position + zipLen);
    $byte.position += zipLen;
    var zipedBuf: ArrayBuffer = unZip(aryBuf)
    return new Pan3d. Pan3dByteArray(zipedBuf)
}


function getUrlParam(name: string): string {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}

function copy2clipboard(val: string): void {
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

function getBit($num: number, offset: number): boolean {
    return (Boolean)($num >> (offset & 31) & 1);
}