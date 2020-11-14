module Pan3d {
    export class AstarUtil {
        constructor() {
        }
        public static navmeshData: any
        private static heightItem: Array<Array<number>>
        private static jumpItem: Array<Array<number>>
        private static aPos: Vector3D = new Vector3D;
        public static midu: number = 10;
        private static astarWidth: number = 0
        private static astarHeight: number = 0
        public static areaRect: Rectangle

        public static setData($tempNavMesh: any): void {

            this.navmeshData = $tempNavMesh;
            this.heightItem = this.navmeshData.heightItem;
            this.jumpItem = this.navmeshData.jumpItem;
            this.midu = this.navmeshData.midu;
            this.aPos = new Vector3D(this.navmeshData.aPos.x, this.navmeshData.aPos.y, this.navmeshData.aPos.z);
            this.makeStarGraph(this.navmeshData.astarItem);

            this.astarWidth = this.heightItem[0].length;
            this.astarHeight = this.heightItem.length;
            SceneManager.getInstance().fixAstart(new Vector2D(this.aPos.x, this.midu * this.astarHeight + this.aPos.z));

            this.mathAreaRect()
            this.mathMinMapRect()

   

        }
        private static _sceneVectList: Array<Vector3D>;
        private static _frist: boolean = false
        public static set sceneVectList(value: Array<Vector3D>) {
            this._sceneVectList = value
            this._frist = true //标记新进入场景时

        }
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

        public static getJumpDataByV2d($tx: number, $ty: number): boolean {
            if (this.jumpItem && this.jumpItem.length) {
                if (this.jumpItem[$ty] && this.jumpItem[$ty][$tx] == 1) {
                    return true
                }
            }
            return false

        }
        public static minMapRect: Rectangle;
        private static mathMinMapRect(): void {
            var midu: number = AstarUtil.navmeshData.midu;
            var mapW: number = AstarUtil.navmeshData.astarItem[0].length;
            var mapH: number = AstarUtil.navmeshData.astarItem.length;

            var tw: number = AstarUtil.navmeshData.aPos.x + mapW * AstarUtil.navmeshData.midu;
            var th: number = AstarUtil.navmeshData.aPos.z + mapH * AstarUtil.navmeshData.midu;

            tw = Math.max(Math.abs(AstarUtil.navmeshData.aPos.x), Math.abs(tw));
            th = Math.max(Math.abs(AstarUtil.navmeshData.aPos.z), Math.abs(th));
            var bsew: number = Math.max(tw, th)
            bsew += 100
            bsew = Math.round(bsew)
            var $infoRect: Rectangle = new Rectangle();
            $infoRect.x = -bsew;
            $infoRect.y = -bsew;
            $infoRect.width = bsew * 2;
            $infoRect.height = bsew * 2;

            $infoRect.x -= 1
            $infoRect.y -= 1
            $infoRect.width += 2
            $infoRect.height += 2

            $infoRect.width /= 2;
            $infoRect.height /= 2;

            this.minMapRect = $infoRect;
        }
        private static mathAreaRect(): void {
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
            this.areaRect = new Rectangle;
            this.areaRect.x = this.aPos.x
            this.areaRect.y = this.aPos.z
            this.areaRect.width = this.astarWidth * this.midu
            this.areaRect.height = this.astarHeight * this.midu


        }
        private static _bakData: any;
        public static clear(): void {
            if (this.navmeshData) {
                this._bakData = this.navmeshData;
                this.aPos.setTo(0, 0, 0);
                this.navmeshData = null;
            }
        }

        public static porcessBak(tf: boolean): void {

            if (tf) {
                this.setData(this._bakData)
            }

            //this._bakData = null;

        }


        public static getHeightByPos($pos: Vector3D): number {

            if (this.heightItem) {
                var $movePos: Vector3D = $pos.subtract(this.aPos).add(new Vector3D(this.midu / 2, 0, this.midu / 2))
                var w: number = (this.astarWidth - 1) * this.midu
                var h: number = (this.astarHeight - 1) * this.midu
                if ($movePos.x > 0 && $movePos.x <= w && $movePos.z > 0 && $movePos.z <= h) {
                    return this.getBaseHeightByBitmapdata($movePos.x / this.midu, $movePos.z / this.midu)
                }
            }
            return -500

        }


        public static getBaseHeightByBitmapdata($xpos: number, $ypos: number): number {
            var perX: number = $xpos - float2int($xpos);
            var perY: number = $ypos - float2int($ypos);

            var zero_zero: number = this.getBitmapDataHight(float2int($xpos), float2int($ypos))
            var zero_one: number = this.getBitmapDataHight(float2int($xpos), Math.ceil($ypos))
            var one_zero: number = this.getBitmapDataHight(Math.ceil($xpos), float2int($ypos))
            var one_one: number = this.getBitmapDataHight(Math.ceil($xpos), Math.ceil($ypos))

            var dis1: number = (1 - perX) * (1 - perY);
            var dis2: number = (1 - perX) * perY;
            var dis3: number = perX * (1 - perY);
            var dis4: number = perX * perY;

            var num: number = (dis1 * zero_zero + dis2 * zero_one + dis3 * one_zero + dis4 * one_one);

            return num;
        }
        private static getBitmapDataHight($tx: number, $ty: number): number {
            return this.heightItem[this.heightItem.length - 1 - $ty][$tx]
        }

        public static findPath($a: Vector3D, $b: Vector3D): Array<Vector3D> {
            
            return null

        }
        public static Path2dTo3d(result: Array<Vector2D>): Array<Vector3D> {
            var astarPosItem: Array<Vector3D> = new Array
            for (var i: number = 0; i < result.length; i++) {
                astarPosItem.push(this.getWorldPosByStart2D(result[i]))
            }
            return astarPosItem
        }
        public static getWorldPosByStart2D(a: Vector2D): Vector3D {
            if (this.navmeshData) {
                var Apos: Vector3D = new Vector3D(a.x * this.midu, 3, a.y * this.midu)
                Apos.x = Apos.x + this.aPos.x + this.midu / 2;
                Apos.z = (this.aPos.z + this.midu * this.astarHeight) - Apos.z - this.midu / 2;
                return Apos
            } else {

                return new Vector3D(a.x * 10 + this.midu / 2, 0, a.y * 10 - this.midu / 2)
            }
        }
        public static findPath3D($a: Vector3D, $b: Vector3D): Array<Vector2D> {
            if (this.navmeshData) {
                if (!AstarUtil.getPosIsCanMove($b)) {
                    $b = this.findNearLinePoint($a, $b)
                }
                var gridVec2DA: Vector2D = this.getGrapIndexByPos($a);
                var gridVec2DB: Vector2D = this.getGrapIndexByPos($b);

                if (this.getJumpDataByV2d(gridVec2DB.x, gridVec2DB.y)) {
                    //console.log("是跳跃区域不可寻路", gridVec2DB.x, gridVec2DB.y)
                    return null;
                }

                if (!this.isGridCanWalk(gridVec2DB)) {
                    return null;
                }
                if (!gridVec2DA) {  //特殊处理如果出去了将直接跳到目的地
                    //console.log("逻辑格位置有错")
                    return null;
                }
                if (this.findStraightLine(gridVec2DA, gridVec2DB)) {
                    ////console.log("直线走走走")
                    return [gridVec2DA, gridVec2DB]
                }
                return this.findPath2D(gridVec2DA, gridVec2DB)
            } else {
                return [this.getGrapIndexByPos($a), this.getGrapIndexByPos($b)]
            }
        }
        //是否可以直线走
        private static findStraightLine($a: Vector2D, $b: Vector2D): boolean {
            var $nrm: Vector2D = new Vector2D($b.x - $a.x, $b.y - $a.y);
            $nrm.normalize();
            var d: number = Math.round(Vector2D.distance($a, $b));
            var p: Vector2D = new Vector2D;
            for (var i: number = 0; i < d; i++) {
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
        }
        public static isGridCanWalk(p: Vector2D): boolean {
            if (p) {
                if (!this.graphData.grid[p.y]) {
                    return false
                }
                if (!this.graphData.grid[p.y][p.x]) {
                    return false
                }
                if (this.graphData.grid[p.y][p.x].weight == 0) {
                    return false;
                } else {
                    return true
                }
            } else {
                //console.log("没有这个点", p);
                return false
            }
        }

        public static findPath2D(gridVec2DA: Vector2D, gridVec2DB: Vector2D): Array<Vector2D> {

           

            return null
        }
        //优化直接
        private static turnLineAstar($arr: Array<Vector2D>): Array<Vector2D> {
            if ($arr.length < 2) {
                return $arr
            }
            var $tempArr: Array<Vector2D> = [$arr[0]];
            for (var i: number = 2; i < $arr.length; i++) {
                if (!this.findStraightLine($tempArr[$tempArr.length - 1], $arr[i])) {
                    $tempArr.push($arr[i - 1]);
                }
            }
            $tempArr.push($arr[$arr.length - 1]);
            if ($arr.length != $tempArr.length) {
                return this.turnLineAstar($tempArr);
            }
            return $tempArr
        }
        //简化寻路结果
        private static simplifyAstar($arr: Array<Vector2D>): Array<Vector2D> {
            var $num: number = 0
            if ($arr.length > 1) {
                //   $arr.splice(0, 1);
            }
            if ($arr.length > 2) {
                var $back: Array<Vector2D> = new Array;
                $back.push($arr[0]); //加上首个

                for (var i: number = 2; i < $arr.length; i++) {
                    var a: Vector2D = $back[$back.length - 1];
                    var b: Vector2D = $arr[i - 1];
                    var c: Vector2D = $arr[i];
                    if (Math.atan2(b.y - a.y, b.x - a.x) != Math.atan2(c.y - a.y, c.x - a.x) || $num > 126) {
                        $back.push(b);
                    } else {
                        $num++
                    }
                }
                $back.push($arr[$arr.length - 1]); //加上最后一个
                return $back
            } else {
                return $arr
            }
        }
        public static findNearLinePoint($a: Vector3D, $b: Vector3D): Vector3D {
            while (Vector3D.distance($a, $b) > 5) {
                $b = this.moveA2B($b, $a, 1)
                if (AstarUtil.getPosIsCanMove($b)) {
                    return $b;
                    //break
                }

            }
            return $b
        }
        private static moveA2B(a: Vector3D, b: Vector3D, speed: number): Vector3D {
            var c: Vector3D = b.subtract(a)
            c.normalize();
            c.scaleBy(speed)
            c = c.add(a)
            return c;

        }
        public static getPosIsCanMove($pos: Vector3D): boolean {

            if (!this.graphData || !this.graphData.grid) {
                //console.log("寻路这时是不可的a")
                return false
            }
            var $kt: Vector2D = this.getGrapIndexByPos($pos);
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





        }

        public static canwalkItem: Array<Vector2D> = []
        public static makeStarGraph($arr: Array<Array<number>>): void {

         


        }
        public static blockAry(ary: Array<Array<number>>): void {
            var list: Array<Array<Vector2D>> = new Array;
            for (var i: number = 0; i < ary.length; i++) {
                list.push([new Vector2D(ary[i][0], ary[i][1]), new Vector2D(ary[i][2], ary[i][3])]);
            }
            this.blockList(list);
        }
        public static blockList(ary: Array<Array<Vector2D>>): void {
            if (this.blockBakData) {
                this.unblock();
            }
            this.blockBakData = new Array;
            for (var i: number = 0; i < ary.length; i++) {
                this.blockPoint(ary[i][0], ary[i][1]);
            }
        }
        public static blockPoint(p1: Vector2D, p2: Vector2D): void {
            var rec: Rectangle = new Rectangle();
            rec.y = Math.min(p1.x, p2.x);
            rec.x = Math.min(p1.y, p2.y);
            rec.height = Math.abs(p1.x - p2.x);
            rec.width = Math.abs(p1.y - p2.y);

            this.blockRec(rec);
        }
        public static blockBakData: Array<Array<any>>;
        public static blockRec($rec: Rectangle): void {
            for (var i: number = 0; i < $rec.width; i++) {
                var ary: Array<any> = new Array;
                for (var j: number = 0; j < $rec.height; j++) {
                    var idx: number = i + $rec.x;
                    var idy: number = j + $rec.y;
                    var g: any = this.graphData.grid[idx][idy]
                    ary.push({ i: idx, j: idy, w: g.weight });
                    g.weight = 0;
                }
                this.blockBakData.push(ary);
            }
        }
        public static unblock(): void {
            if (!this.blockBakData) {
                return;
            }
            for (var i: number = 0; i < this.blockBakData.length; i++) {
                for (var j: number = 0; j < this.blockBakData[i].length; j++) {
                    var g: any = this.blockBakData[i][j];
                    this.graphData.grid[g.i][g.j].weight = g.w;
                }
            }
            this.blockBakData = null;
        }
        public static graphData: any;
        public static getGrapIndexByPos($pos: Vector3D): Vector2D {
            if (this.navmeshData) {
                var $movePos: Vector3D = $pos.subtract(this.aPos).add(new Vector3D(0, 0, this.midu / 2))
                var w: number = this.astarWidth * this.midu
                var h: number = this.astarHeight * this.midu
                if ($movePos.x > 0 && $movePos.x < w && $movePos.z > 0 && $movePos.z < h) {
                    return new Vector2D(float2int($movePos.x / this.midu), float2int(this.astarHeight - $movePos.z / this.midu))
                }
            } else {
                return new Vector2D(float2int($pos.x / this.midu), float2int($pos.z / this.midu))
            }
            return null

        }

        public static getScenePos($x: number, $y: number): Vector3D {

            var $temp: Vector3D = Groundposition.getGroundPos($x, $y)
            return this.getLookAtPos($temp);
        }






        public static getLookAtPos($hit3D: Vector3D): Vector3D {


            var $cam3D: Vector3D = new Vector3D(Scene_data.cam3D.x, Scene_data.cam3D.y, Scene_data.cam3D.z)

            var nrm: Vector3D = $hit3D.subtract($cam3D)
            nrm.normalize()



            var $dis: number = 0
            var backB: Vector3D;
            while (true) {
                $dis += 2
                var $n: Vector3D = nrm.clone();
                $n.scaleBy($dis)
                var $XZ: Vector3D = $cam3D.add($n);
                var $y: number = AstarUtil.getHeightByPos($XZ)

                if ($y > $XZ.y) {
                    backB = $XZ
                    break
                }
                if ($dis > 1000)  //当向前1000都还没找到。就退出
                {
                    backB = null
                    break;
                }
            }

            return backB


        }


    }
}