var Pan3d;
(function (Pan3d) {
    var AstarUtil = /** @class */ (function () {
        function AstarUtil() {
        }
        AstarUtil.setData = function ($tempNavMesh) {
            this.navmeshData = $tempNavMesh;
            this.heightItem = this.navmeshData.heightItem;
            this.jumpItem = this.navmeshData.jumpItem;
            this.midu = this.navmeshData.midu;
            this.aPos = new Pan3d.Vector3D(this.navmeshData.aPos.x, this.navmeshData.aPos.y, this.navmeshData.aPos.z);
            this.makeStarGraph(this.navmeshData.astarItem);
            this.astarWidth = this.heightItem[0].length;
            this.astarHeight = this.heightItem.length;
            Pan3d.SceneManager.getInstance().fixAstart(new Pan3d.Vector2D(this.aPos.x, this.midu * this.astarHeight + this.aPos.z));
            this.mathAreaRect();
            this.mathMinMapRect();
        };
        Object.defineProperty(AstarUtil, "sceneVectList", {
            set: function (value) {
                this._sceneVectList = value;
                this._frist = true; //标记新进入场景时
            },
            enumerable: true,
            configurable: true
        });
        /*
        public static sceneRotationInfo(): void {
            
            if (!this.navmeshData) {
                return;
            }
            if (this._sceneVectList) {
                var $focus2D: Vector2D = AstarUtil.getGrapIndexByPos(new Vector3D(Scene_data.focus3D.x, Scene_data.focus3D.y, Scene_data.focus3D.z))
                for (var i: number = 0; i < this._sceneVectList.length; i++) {
                    var $pos: Vector2D = new Vector2D(this._sceneVectList[i].x, this._sceneVectList[i].y)
                    var $dis: number = Vector2D.distance($pos, $focus2D);
                    this._sceneVectList[i].z = $dis;
                }
                this._sceneVectList.sort(
                    function (a: Vector3D, b: Vector3D): number {
                        return a.z - b.z;
                    }
                )
                var disA: number = Vector2D.distance(new Vector2D(this._sceneVectList[0].x, this._sceneVectList[0].y), $focus2D);
                var disB: number = Vector2D.distance(new Vector2D(this._sceneVectList[1].x, this._sceneVectList[1].y), $focus2D);
                var $kangly: number = disA / (disA + disB) * this._sceneVectList[1].w + disB / (disA + disB) * this._sceneVectList[0].w
                if (this._frist) {
                    this._frist = false
                    Scene_data.focus3D.rotationY = Scene_data.gameAngle + $kangly;
                } else {
                    Scene_data.focus3D.rotationY += ((Scene_data.gameAngle + $kangly) - Scene_data.focus3D.rotationY) / 100;
                }
            } else {
                Scene_data.focus3D.rotationY = Scene_data.gameAngle;
            }
    
        }
        */
        AstarUtil.getJumpDataByV2d = function ($tx, $ty) {
            if (this.jumpItem && this.jumpItem.length) {
                if (this.jumpItem[$ty] && this.jumpItem[$ty][$tx] == 1) {
                    return true;
                }
            }
            return false;
        };
        AstarUtil.mathMinMapRect = function () {
            var midu = AstarUtil.navmeshData.midu;
            var mapW = AstarUtil.navmeshData.astarItem[0].length;
            var mapH = AstarUtil.navmeshData.astarItem.length;
            var tw = AstarUtil.navmeshData.aPos.x + mapW * AstarUtil.navmeshData.midu;
            var th = AstarUtil.navmeshData.aPos.z + mapH * AstarUtil.navmeshData.midu;
            tw = Math.max(Math.abs(AstarUtil.navmeshData.aPos.x), Math.abs(tw));
            th = Math.max(Math.abs(AstarUtil.navmeshData.aPos.z), Math.abs(th));
            var bsew = Math.max(tw, th);
            bsew += 100;
            bsew = Math.round(bsew);
            var $infoRect = new Pan3d.Rectangle();
            $infoRect.x = -bsew;
            $infoRect.y = -bsew;
            $infoRect.width = bsew * 2;
            $infoRect.height = bsew * 2;
            $infoRect.x -= 1;
            $infoRect.y -= 1;
            $infoRect.width += 2;
            $infoRect.height += 2;
            $infoRect.width /= 2;
            $infoRect.height /= 2;
            this.minMapRect = $infoRect;
        };
        AstarUtil.mathAreaRect = function () {
            /*
            var $minx: number = this.astarWidth;
            var $miny: number = this.astarHeight;
            var $maxx: number =0;
            var $maxy: number = 0;
            for (var i: number = 0; i < this.astarHeight; i++) {
                for (var j: number = 0; j < this.astarWidth; j++) {
                    if (this.graphData.grid[i][j].weight==1) {
                        if ($minx > j) {
                            $minx = j
                        }
                        if ($miny > i) {
                            $miny = i
                        }
    
                        if ($maxx <j) {
                            $maxx = j
                        }
                        if ($maxy < i) {
                            $maxy = i
                        }
                    }
                   
    
                }
            }
            //console.log("$minx", $minx);
            //console.log("$miny", $miny);
            //console.log("$maxx", $maxx);
            //console.log("$maxy", $maxy);
    
            var tx: number = this.aPos.x + $minx * this.midu;
            var tz: number = this.aPos.z + $miny * this.midu;
            var tw: number = this.aPos.x + $maxx * this.midu;
            var th: number = this.aPos.z + $maxy * this.midu;
    
            */
            this.areaRect = new Pan3d.Rectangle;
            this.areaRect.x = this.aPos.x;
            this.areaRect.y = this.aPos.z;
            this.areaRect.width = this.astarWidth * this.midu;
            this.areaRect.height = this.astarHeight * this.midu;
        };
        AstarUtil.clear = function () {
            if (this.navmeshData) {
                this._bakData = this.navmeshData;
                this.aPos.setTo(0, 0, 0);
                this.navmeshData = null;
            }
        };
        AstarUtil.porcessBak = function (tf) {
            if (tf) {
                this.setData(this._bakData);
            }
            //this._bakData = null;
        };
        AstarUtil.getHeightByPos = function ($pos) {
            if (this.heightItem) {
                var $movePos = $pos.subtract(this.aPos).add(new Pan3d.Vector3D(this.midu / 2, 0, this.midu / 2));
                var w = (this.astarWidth - 1) * this.midu;
                var h = (this.astarHeight - 1) * this.midu;
                if ($movePos.x > 0 && $movePos.x <= w && $movePos.z > 0 && $movePos.z <= h) {
                    return this.getBaseHeightByBitmapdata($movePos.x / this.midu, $movePos.z / this.midu);
                }
            }
            return -500;
        };
        AstarUtil.getBaseHeightByBitmapdata = function ($xpos, $ypos) {
            var perX = $xpos - float2int($xpos);
            var perY = $ypos - float2int($ypos);
            var zero_zero = this.getBitmapDataHight(float2int($xpos), float2int($ypos));
            var zero_one = this.getBitmapDataHight(float2int($xpos), Math.ceil($ypos));
            var one_zero = this.getBitmapDataHight(Math.ceil($xpos), float2int($ypos));
            var one_one = this.getBitmapDataHight(Math.ceil($xpos), Math.ceil($ypos));
            var dis1 = (1 - perX) * (1 - perY);
            var dis2 = (1 - perX) * perY;
            var dis3 = perX * (1 - perY);
            var dis4 = perX * perY;
            var num = (dis1 * zero_zero + dis2 * zero_one + dis3 * one_zero + dis4 * one_one);
            return num;
        };
        AstarUtil.getBitmapDataHight = function ($tx, $ty) {
            return this.heightItem[this.heightItem.length - 1 - $ty][$tx];
        };
        AstarUtil.findPath = function ($a, $b) {
            return null;
        };
        AstarUtil.Path2dTo3d = function (result) {
            var astarPosItem = new Array;
            for (var i = 0; i < result.length; i++) {
                astarPosItem.push(this.getWorldPosByStart2D(result[i]));
            }
            return astarPosItem;
        };
        AstarUtil.getWorldPosByStart2D = function (a) {
            if (this.navmeshData) {
                var Apos = new Pan3d.Vector3D(a.x * this.midu, 3, a.y * this.midu);
                Apos.x = Apos.x + this.aPos.x + this.midu / 2;
                Apos.z = (this.aPos.z + this.midu * this.astarHeight) - Apos.z - this.midu / 2;
                return Apos;
            }
            else {
                return new Pan3d.Vector3D(a.x * 10 + this.midu / 2, 0, a.y * 10 - this.midu / 2);
            }
        };
        AstarUtil.findPath3D = function ($a, $b) {
            if (this.navmeshData) {
                if (!AstarUtil.getPosIsCanMove($b)) {
                    $b = this.findNearLinePoint($a, $b);
                }
                var gridVec2DA = this.getGrapIndexByPos($a);
                var gridVec2DB = this.getGrapIndexByPos($b);
                if (this.getJumpDataByV2d(gridVec2DB.x, gridVec2DB.y)) {
                    //console.log("是跳跃区域不可寻路", gridVec2DB.x, gridVec2DB.y)
                    return null;
                }
                if (!this.isGridCanWalk(gridVec2DB)) {
                    return null;
                }
                if (!gridVec2DA) { //特殊处理如果出去了将直接跳到目的地
                    //console.log("逻辑格位置有错")
                    return null;
                }
                if (this.findStraightLine(gridVec2DA, gridVec2DB)) {
                    ////console.log("直线走走走")
                    return [gridVec2DA, gridVec2DB];
                }
                return this.findPath2D(gridVec2DA, gridVec2DB);
            }
            else {
                return [this.getGrapIndexByPos($a), this.getGrapIndexByPos($b)];
            }
        };
        //是否可以直线走
        AstarUtil.findStraightLine = function ($a, $b) {
            var $nrm = new Pan3d.Vector2D($b.x - $a.x, $b.y - $a.y);
            $nrm.normalize();
            var d = Math.round(Pan3d.Vector2D.distance($a, $b));
            var p = new Pan3d.Vector2D;
            for (var i = 0; i < d; i++) {
                p.x = Math.floor($a.x + i * $nrm.x);
                p.y = Math.floor($a.y + i * $nrm.y);
                if (!this.isGridCanWalk(p)) {
                    return false;
                }
                p.x = Math.ceil($a.x + i * $nrm.x);
                p.y = Math.ceil($a.y + i * $nrm.y);
                if (!this.isGridCanWalk(p)) {
                    return false;
                }
                p.x = Math.round($a.x + i * $nrm.x);
                p.y = Math.round($a.y + i * $nrm.y);
                if (!this.isGridCanWalk(p)) {
                    return false;
                }
            }
            return true;
        };
        AstarUtil.isGridCanWalk = function (p) {
            if (p) {
                if (!this.graphData.grid[p.y]) {
                    return false;
                }
                if (!this.graphData.grid[p.y][p.x]) {
                    return false;
                }
                if (this.graphData.grid[p.y][p.x].weight == 0) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                //console.log("没有这个点", p);
                return false;
            }
        };
        AstarUtil.findPath2D = function (gridVec2DA, gridVec2DB) {
            return null;
        };
        //优化直接
        AstarUtil.turnLineAstar = function ($arr) {
            if ($arr.length < 2) {
                return $arr;
            }
            var $tempArr = [$arr[0]];
            for (var i = 2; i < $arr.length; i++) {
                if (!this.findStraightLine($tempArr[$tempArr.length - 1], $arr[i])) {
                    $tempArr.push($arr[i - 1]);
                }
            }
            $tempArr.push($arr[$arr.length - 1]);
            if ($arr.length != $tempArr.length) {
                return this.turnLineAstar($tempArr);
            }
            return $tempArr;
        };
        //简化寻路结果
        AstarUtil.simplifyAstar = function ($arr) {
            var $num = 0;
            if ($arr.length > 1) {
                //   $arr.splice(0, 1);
            }
            if ($arr.length > 2) {
                var $back = new Array;
                $back.push($arr[0]); //加上首个
                for (var i = 2; i < $arr.length; i++) {
                    var a = $back[$back.length - 1];
                    var b = $arr[i - 1];
                    var c = $arr[i];
                    if (Math.atan2(b.y - a.y, b.x - a.x) != Math.atan2(c.y - a.y, c.x - a.x) || $num > 126) {
                        $back.push(b);
                    }
                    else {
                        $num++;
                    }
                }
                $back.push($arr[$arr.length - 1]); //加上最后一个
                return $back;
            }
            else {
                return $arr;
            }
        };
        AstarUtil.findNearLinePoint = function ($a, $b) {
            while (Pan3d.Vector3D.distance($a, $b) > 5) {
                $b = this.moveA2B($b, $a, 1);
                if (AstarUtil.getPosIsCanMove($b)) {
                    return $b;
                    //break
                }
            }
            return $b;
        };
        AstarUtil.moveA2B = function (a, b, speed) {
            var c = b.subtract(a);
            c.normalize();
            c.scaleBy(speed);
            c = c.add(a);
            return c;
        };
        AstarUtil.getPosIsCanMove = function ($pos) {
            if (!this.graphData || !this.graphData.grid) {
                //console.log("寻路这时是不可的a")
                return false;
            }
            var $kt = this.getGrapIndexByPos($pos);
            return this.isGridCanWalk($kt);
            //if (!$kt||!this.graphData.grid[$kt.y] || !this.graphData.grid[$kt.y][$kt.x]) {
            //    //console.log("寻路这时是不可的b")
            //    return false
            //}
            //if ($kt && this.graphData.grid[$kt.y][$kt.x].weight) {
            //    return true;
            //} else {
            //    return false;
            //}
        };
        AstarUtil.makeStarGraph = function ($arr) {
        };
        AstarUtil.blockAry = function (ary) {
            var list = new Array;
            for (var i = 0; i < ary.length; i++) {
                list.push([new Pan3d.Vector2D(ary[i][0], ary[i][1]), new Pan3d.Vector2D(ary[i][2], ary[i][3])]);
            }
            this.blockList(list);
        };
        AstarUtil.blockList = function (ary) {
            if (this.blockBakData) {
                this.unblock();
            }
            this.blockBakData = new Array;
            for (var i = 0; i < ary.length; i++) {
                this.blockPoint(ary[i][0], ary[i][1]);
            }
        };
        AstarUtil.blockPoint = function (p1, p2) {
            var rec = new Pan3d.Rectangle();
            rec.y = Math.min(p1.x, p2.x);
            rec.x = Math.min(p1.y, p2.y);
            rec.height = Math.abs(p1.x - p2.x);
            rec.width = Math.abs(p1.y - p2.y);
            this.blockRec(rec);
        };
        AstarUtil.blockRec = function ($rec) {
            for (var i = 0; i < $rec.width; i++) {
                var ary = new Array;
                for (var j = 0; j < $rec.height; j++) {
                    var idx = i + $rec.x;
                    var idy = j + $rec.y;
                    var g = this.graphData.grid[idx][idy];
                    ary.push({ i: idx, j: idy, w: g.weight });
                    g.weight = 0;
                }
                this.blockBakData.push(ary);
            }
        };
        AstarUtil.unblock = function () {
            if (!this.blockBakData) {
                return;
            }
            for (var i = 0; i < this.blockBakData.length; i++) {
                for (var j = 0; j < this.blockBakData[i].length; j++) {
                    var g = this.blockBakData[i][j];
                    this.graphData.grid[g.i][g.j].weight = g.w;
                }
            }
            this.blockBakData = null;
        };
        AstarUtil.getGrapIndexByPos = function ($pos) {
            if (this.navmeshData) {
                var $movePos = $pos.subtract(this.aPos).add(new Pan3d.Vector3D(0, 0, this.midu / 2));
                var w = this.astarWidth * this.midu;
                var h = this.astarHeight * this.midu;
                if ($movePos.x > 0 && $movePos.x < w && $movePos.z > 0 && $movePos.z < h) {
                    return new Pan3d.Vector2D(float2int($movePos.x / this.midu), float2int(this.astarHeight - $movePos.z / this.midu));
                }
            }
            else {
                return new Pan3d.Vector2D(float2int($pos.x / this.midu), float2int($pos.z / this.midu));
            }
            return null;
        };
        AstarUtil.getScenePos = function ($x, $y) {
            var $temp = Pan3d.Groundposition.getGroundPos($x, $y);
            return this.getLookAtPos($temp);
        };
        AstarUtil.getLookAtPos = function ($hit3D) {
            var $cam3D = new Pan3d.Vector3D(Pan3d.Scene_data.cam3D.x, Pan3d.Scene_data.cam3D.y, Pan3d.Scene_data.cam3D.z);
            var nrm = $hit3D.subtract($cam3D);
            nrm.normalize();
            var $dis = 0;
            var backB;
            while (true) {
                $dis += 2;
                var $n = nrm.clone();
                $n.scaleBy($dis);
                var $XZ = $cam3D.add($n);
                var $y = AstarUtil.getHeightByPos($XZ);
                if ($y > $XZ.y) {
                    backB = $XZ;
                    break;
                }
                if ($dis > 1000) //当向前1000都还没找到。就退出
                 {
                    backB = null;
                    break;
                }
            }
            return backB;
        };
        AstarUtil.aPos = new Pan3d.Vector3D;
        AstarUtil.midu = 10;
        AstarUtil.astarWidth = 0;
        AstarUtil.astarHeight = 0;
        AstarUtil._frist = false;
        AstarUtil.canwalkItem = [];
        return AstarUtil;
    }());
    Pan3d.AstarUtil = AstarUtil;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=AstarUtil.js.map