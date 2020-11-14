namespace tl3d {
    export class SceneManager {
        public get displayList(): Array<Display3D> {
            return this._displayList;
        }
        public fbo: tl3d. FBO;
        public light: tl3d. LightVo;
        public startTime:number;
        //
        protected _displayList: Array<Display3D>;
        protected _display2DList: Array<Display3D>;
        protected _displaySpriteList: Array<Display3DSprite>;
        protected _displayRoleList: Array<Display3dMovie>;
        protected _time: number;
        protected _ready: boolean = false;
        public render: boolean = true;
        protected _sceneDic: Object;
        protected _sceneQuadTree: SceneQuadTree;
        protected _currentUrl: string;
        //
        public shadowMgr: ShadowManager
        public groupDataMgr : GroupDataManager
        public skillMgr: SkillManager;
        public mapData:Object;
        public bloodMgr: BloodManager;
   

        constructor() {
            this._displayList = new Array;
            this._displaySpriteList = new Array;
            this._displayRoleList = new Array;
            this._display2DList = new Array;
            this.startTime = TimeUtil.START_TIME;
            this._time = TimeUtil.getTimer(this.startTime);
            this._sceneDic = new Object;
            this.initScene();
            this._particleList = new Array;
            //
            this.shadowMgr = new ShadowManager();
            this.skillMgr = new SkillManager(this);
            this.groupDataMgr = new GroupDataManager(this);
        }
        public get displayRoleList(): Array<Display3dMovie> {
            return this._displayRoleList;
        }
        public get displaySpriteList(): Array<Display3DSprite> {
            return this._displaySpriteList;
        }

        public testUrl($url: string): boolean {
            return this._currentUrl == $url;
        }

        public loadScene($url: string, $completeFun: Function, $progressFun: Function, $analysisCompleteFun: Function): void {
            if (this._currentUrl == $url) {//原场景不加载
                this._ready = true;
                $completeFun();
                var sceneRes=SceneResManager.getInstance().getRes($url);
                sceneRes&&this.setFogData(sceneRes.sceneData);
                $analysisCompleteFun();
                return;
            }

            this.clearStaticScene();
            this._ready = false;
            SceneResManager.getInstance().loadSceneRes($url, $completeFun, $progressFun, ($str: any) => {
                this.loadSceneConfigCom($str);
                $analysisCompleteFun();
            });

            this._currentUrl = $url;
        }

        private addSceneImgBg(info: any): void {
            var displayimg: Display3dBg = new Display3dBg();
            displayimg.setImgInfo(info.url, info.width, info.height);
            this.addDisplay(displayimg);
        }

        public getDisplayByID($type: number, $id: number): any {

            if ($type == 0) {
                return this._sceneDic["build" + $id];
            } else if ($type == 1) {
                return this._sceneDic["particle" + $id];
            }

        }

        public fixAstart(pos: Vector2D): void {
            for (var i: number = 0; i < this._displayRoleList.length; i++) {
                this._displayRoleList[i].fixAstartData(pos);
            }
        }

        //设置雾效数据
        public setFogData(obj):void{
            Scene_data.fogColor = [obj.fogColor.x / 255.0, obj.fogColor.y / 255.0, obj.fogColor.z / 255.0];
            var d: number = obj.fogDistance +1000;//2000 参考
            var s: number = obj.fogAttenuation;  //0.2 参考
            Scene_data.gameAngle = isNaN(obj.gameAngle) ? 0 : obj.gameAngle;
            Scene_data.focus3D.rotationY = Scene_data.gameAngle;
            Scene_data.fogData = [d * s, 1 / ((1 - s) * d)]
        }


        //场景数据加载完毕
        public loadSceneConfigCom(obj: any): void {
            this.mapData=obj;
            this._sceneDic = new Object();
            var groundAry: Array<any> = obj.groundItem;
            var buildAry: Array<any> = obj.buildItem;
            this.setFogData(obj);
            Scene_data.sceneNumId++;
            for (var j: number = 0; groundAry && j < groundAry.length; j++) {
                var groundDisplay: Display3DSprite = this.getGroundSprite(groundAry[j], obj.terrain);
                this.addDisplay(groundDisplay)
            }
            for (var i: number = 0; i < buildAry.length; i++) {
                var itemObj: any = buildAry[i];
                if (itemObj.type == BaseRes.PREFAB_TYPE) {
                    var itemDisplay: Display3DSprite = this.getBuildSprite(itemObj);
                    this.addDisplay(itemDisplay)
                } else if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle: CombineParticle = this.getParticleSprite(itemObj);
                    this.addParticle(particle)
                }
            }

            Scene_data.light.setData(obj.SunNrm, obj.SunLigth, obj.AmbientLight);

            LightProbeManager.getInstance().setLightProbeData(obj.lightProbeItem);


            this._ready = true;

            if (obj.quadTreeData) {
                this._sceneQuadTree = new SceneQuadTree();
                this._sceneQuadTree.init(obj.quadTreeData, this._sceneDic);
            } else {
                this._sceneQuadTree = null;
            }
        }

        private getGroundSprite(itemObj: any, terrain: Array<GroundDataMesh>): TerrainDisplay3DSprite {
            var itemDisplay: TerrainDisplay3DSprite = new TerrainDisplay3DSprite();
            itemDisplay.setObjUrl(itemObj.objsurl);
            itemDisplay.setMaterialUrl(itemObj.materialurl, itemObj.materialInfoArr);
            itemDisplay.materialInfoArr = itemObj.materialInfoArr

            itemDisplay.setLightMapUrl(itemObj.lighturl);
            itemDisplay.scaleX = itemObj.scaleX;
            itemDisplay.scaleY = itemObj.scaleY;
            itemDisplay.scaleZ = itemObj.scaleZ;

            itemDisplay.x = itemObj.x;
            itemDisplay.y = itemObj.y;
            itemDisplay.z = itemObj.z;

            itemDisplay.rotationX = itemObj.rotationX;
            itemDisplay.rotationY = itemObj.rotationY;
            itemDisplay.rotationZ = itemObj.rotationZ;

            itemDisplay.objData.lightuvsOffsets = itemDisplay.objData.uvsOffsets;

            if (terrain) {
                itemDisplay.setGrounDataMesh(terrain[itemObj.id])
            }
            this._sceneDic["ground" + itemObj.id] = itemDisplay;
            return itemDisplay;
        }
        private makeCollisioin(arr: Array<any>): void {

        }

        public set ready($value: boolean) {
            //console.log("--setready--", $value);
            this._ready = $value;
        }

        public get ready(): boolean {
            return this._ready;
        }

        private getBuildSprite(itemObj: any): Display3DSprite {
            var itemDisplay: Display3DSprite = new Display3DSprite();
            itemDisplay.setObjUrl(itemObj.objsurl);


            itemDisplay.setMaterialUrl(itemObj.materialurl, itemObj.materialInfoArr);
            itemDisplay.materialInfoArr = itemObj.materialInfoArr
            itemDisplay.setLightMapUrl(itemObj.lighturl);
            itemDisplay.scaleX = itemObj.scaleX;
            itemDisplay.scaleY = itemObj.scaleY;
            itemDisplay.scaleZ = itemObj.scaleZ;

            itemDisplay.x = itemObj.x;
            itemDisplay.y = itemObj.y;
            itemDisplay.z = itemObj.z;

            itemDisplay.rotationX = itemObj.rotationX;
            itemDisplay.rotationY = itemObj.rotationY;
            itemDisplay.rotationZ = itemObj.rotationZ;

            itemDisplay.isPerspective = itemObj.isPerspective;


            itemDisplay.type = 0;
            itemDisplay.id = itemObj.id;
            this._sceneDic["build" + itemObj.id] = itemDisplay;

            return itemDisplay;
        }

        private getParticleSprite(itemObj: any): CombineParticle {
            var particle: CombineParticle

            particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + itemObj.url);


            particle.scaleX = itemObj.scaleX;
            particle.scaleY = itemObj.scaleY;
            particle.scaleZ = itemObj.scaleZ;

            particle.x = itemObj.x;
            particle.y = itemObj.y;
            particle.z = itemObj.z;

            particle.rotationX = itemObj.rotationX;
            particle.rotationY = itemObj.rotationY;
            particle.rotationZ = itemObj.rotationZ;
            particle.type = 0;
            this._sceneDic["particle" + itemObj.id] = particle;
            return particle;
        }

        private initScene(): void {
            //this._displayList.push(new GridLineSprite());
        }

        public addDisplay($display: Display3D): void {
            if (this._displayList.indexOf($display) != -1) {
                return;
            }
            this._displayList.push($display);
            $display.addStage();
        }

        public removeDisplay($display: Display3D): void {
            var index: number = this._displayList.indexOf($display);
            if (index != -1) {
                this._displayList.splice(index, 1);
            }
            $display.removeStage();
        }
        /**
         * 动态添加的staticMesh 物件例如武器等
        */
        public addSpriteDisplay($display: Display3DSprite): void {
            if (this._displaySpriteList.indexOf($display) != -1) {
                return;
            }
            $display.addStage();
            for (var i: number = 0; i < this._displaySpriteList.length; i++) {
                if (this._displaySpriteList[i].materialUrl == $display.materialUrl) {
                    this._displaySpriteList.splice(i, 0, $display);
                    return;
                }
            }
            this._displaySpriteList.push($display);

        }

        public removeSpriteDisplay($display: Display3DSprite): void {
            var index: number = this._displaySpriteList.indexOf($display);
            if (index != -1) {
                this._displaySpriteList.splice(index, 1);
            }
            $display.removeStage();
        }
    

        public addMovieDisplayTop($display: Display3dMovie): void {
            this._displayRoleList.unshift($display);
            $display.addStage();
        }

        private setParticleVisible(): void {
            var $arr: Array<CombineParticle> = this._particleList
            for (var i: number = 0; $arr && i < $arr.length; i++) {
                if (!$arr[i].dynamic && $arr[i].bindVecter3d) {
                    var dis: number = Vector3D.distance(new Vector3D(Scene_data.focus3D.x, Scene_data.focus3D.y, Scene_data.focus3D.z), new Vector3D($arr[i].x, $arr[i].y, $arr[i].z))
                    $arr[i].sceneVisible = (dis < 1000);
                }
            }
        }

        public cameraMatrix: tl3d.Matrix3D;
        public viewMatrx3D:tl3d.Matrix3D;
        static mapQudaTreeDistance: number = 200;

        public upFrame(): void {
            if (this._sceneQuadTree) {
                this._sceneQuadTree.setCircle(Scene_data.focus3D.x, Scene_data.focus3D.z, SceneManager.mapQudaTreeDistance);
                if (this._sceneQuadTree.needUpdata) {
                    for (var i: number = 0; i < this._displayList.length; i++) {
                        this._displayList[i].sceneVisible = false;
                        this._displayList[i].sceneVisible = true;
                    }

                    this.setParticleVisible()
                    this._sceneQuadTree.update();
                    this.mathCamFar()
                }
            }

            Scene_data.context3D._contextSetTest.clear();
            if (isNaN(this._time)) {
                this._time = tl3d.TimeUtil.getTimer(this.startTime)
            }
            this.updateMovieFrame();
            if (this._ready) {
                this.updateParticleTime();
                this.skillMgr.update()

                if (this.render) {
                    Scene_data.context3D.setWriteDepth(true);
                    Scene_data.context3D.setDepthTest(true);
                    this.updateStaticDiplay();
                    this.updateSpriteDisplay();
                    this.updateMovieDisplay();
                    this.shadowMgr.update()
                    Scene_data.context3D.setWriteDepth(false);
                    this.updateParticles();
                     if(this.bloodMgr)
                        this.bloodMgr.update(); 
                    Scene_data.context3D.setBlendParticleFactors(0)
                    Scene_data.context3D.setWriteDepth(true);
                    Scene_data.context3D.setWriteDepth(false);
                }
                Scene_data.context3D.setDepthTest(false);
                tl3d.UIManager.getInstance().update();
                this.cameraMatrix = Scene_data.cam3D.cameraMatrix.clone();
                this.viewMatrx3D = Scene_data.viewMatrx3D.clone();
            }
        }

        public updateFBO(): void {
            if (!Scene_data.fbo) {
                Scene_data.fbo = Scene_data.context3D.getFBO();
            }
            if (this._displayList.length == 0) {
                return;
            }
            Scene_data.context3D.updateFBO(Scene_data.fbo);
            Scene_data.viewMatrx3D.identity();
            Scene_data.context3D.renderContext.viewport(0, 0, FBO.fw, FBO.fh);
            Scene_data.viewMatrx3D.perspectiveFieldOfViewLH(2, 1, 50, Scene_data.camFar);
            Scene_data.viewMatrx3D.appendScale(2, 2 * (Scene_data.stageWidth / Scene_data.stageHeight), 1);
            MathClass.updateVp();
            this.updateStaticDiplay();
            Engine.resetSize();
            Scene_data.context3D.renderContext.bindFramebuffer(Scene_data.context3D.renderContext.FRAMEBUFFER, null);
        }

        public addDisplay2DList($dis: Display3D): void {
            this._display2DList.push($dis)
        }
        private mathCamFar(): void {
            var $p: Vector3D = new Vector3D
            var $far: number = 0;
            for (var i: number = 0; i < this._displayList.length; i++) {
                var $dis: Display3DSprite = <Display3DSprite>this._displayList[i]
                if ($dis.sceneVisible && $dis.aabb) {
                    var $m: Matrix3D = $dis.posMatrix.clone();
                    $m.append(Scene_data.cam3D.cameraMatrix);
                    var $aabbVect: Array<Vector3D> = $dis.aabbVect
                    for (var k: number = 0; k < $aabbVect.length; k++) {
                        $p = Scene_data.cam3D.cameraMatrix.transformVector($aabbVect[k])
                        if ($p.z > $far) {
                            $far = $p.z
                        }
                    }
                    /*
                    if (this._displayList[i].objData) {
                    
                        for (var j: number = 0; j < $dis.objData.vertices.length/3; j++) {
                            $p.x = $dis.objData.vertices[j * 3 + 0]
                            $p.y = $dis.objData.vertices[j * 3 + 1]
                            $p.z = $dis.objData.vertices[j * 3 + 2]
                            $p = $dis.posMatrix.transformVector($p);
                            $p=Scene_data.cam3D.cameraMatrix.transformVector($p)
                            if ($p.z > $far) {
                                $far = $p.z
                            }
                        }
                    }
                    */
                }
            }
            Scene_data.camFar = Math.max(500, $far + 100)
            Engine.resetViewMatrx3D();
        }

        protected updateStaticDiplay(): void {
            var num: number = 0;
            for (var i: number = 0; i < this._displayList.length; i++) {
                this._displayList[i].update();
                // if (this._displayList[i].sceneVisible) {
                //     num++;
                // }
            }
            // FpsMc.tipStr = "drawNum:" + (num + this._displayRoleList.length) + "/" + this._displayList.length; 


        }

        protected updateStaticBind(): void {
            // for (var i: number = 0; i < this._displayList.length; i++) {
            //     this._displayList[i].updateBind();
            // }
        }

        protected updateSpriteDisplay(): void {
            for (var i: number = 0; i < this._displaySpriteList.length; i++) {
                this._displaySpriteList[i].update();
            }
        }

        protected updateMovieDisplay(): void {
            for (var i: number = 0; i < this._displayRoleList.length; i++) {
                this._displayRoleList[i].update();
            }
            // if (this._displayRoleList.length) {
            //    Scene_data.context3D.setVa(0, 2, null); //如果有角色,在这里要将顶点置空  ->$$$ 需要优化。这里临时处理
            //    Scene_data.context3D.setVa(1, 2, null); //如果有角色,在这里要将顶点置空  ->$$$ 需要优化。这里临时处理
            //    Scene_data.context3D.setVa(2, 2, null); //如果有角色,在这里要将顶点置空  ->$$$ 需要优化。这里临时处理
            // }
       
        }
        protected updateMovieFrame(): void {
            var t: number = TimeUtil.getTimer(this.startTime);
            var delay: number = t - this._time;
            this._time = t;
            for (var i: number = 0; i < this._displayRoleList.length; i++) {
                this._displayRoleList[i].updateFrame(delay);
            }
            //  FpsMc.tipStr = "人数:" + (this._displayRoleList.length) 
        }

        public changeBloodManager($bloodManager:BloodManager): void {
            this.bloodMgr = $bloodManager
        } 
        public addMovieDisplay($display: Display3dMovie): void {
            $display._scene=this
            this._displayRoleList.push($display);
            $display.addStage();
        }

         public clearStaticScene(): void {
            //清理角色
            for (var key in this._sceneDic) {
                var obj: any = this._sceneDic[key];
                if (obj instanceof CombineParticle) {
                    this.removeParticle(obj);
                }
                if (obj instanceof tl3d.Display3DSprite) {
                    obj.removeStage();
                    obj.destory();
                }
            }
            this._ready = false;

            this._sceneDic = null;

            this._sceneQuadTree = null;

            this._displayList.length = 0;

            this.removeAllMovieDisplay();
            this._displayRoleList.length = 0;
            //清除所有特效（包含遗漏的）
            this.clearAllParticle();
            this._currentUrl = "";
            this.mapData=null;
        }

        public playLyf($url: string, $pos: tl3d.Vector3D, $r: number = 20,$scale:number = 1): void {
            this.groupDataMgr.getGroupData(Scene_data.fileRoot + $url, (groupRes: tl3d.GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: tl3d.GroupItem = groupRes.dataAry[i];
                    if (item.types == tl3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle: tl3d.CombineParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                        $particle.x = $pos.x;
                        $particle.y = $pos.y;
                        $particle.z = $pos.z;
                        $particle.rotationX = $r;
                        $particle.scaleX = $scale
                        $particle.scaleY = $scale
                        $particle.scaleZ = $scale
                        this.addParticle($particle);
                        $particle.addEventListener(tl3d.BaseEvent.COMPLETE, this.onPlayCom, this);
                    } else {
                        console.log("播放的不是单纯特效");
                    }
                }
            })
        }

        public charPlaySkill($char: Display3dMovie, $skillfile: string,$skilleff:string = "skill_01",$cb:Function = null): Skill {
            if (!$char._scene.ready) {
                return;
            }
          
            var $skill: Skill = this.skillMgr.getSkill(UnitFunction.getSkillUrl($skillfile), $skilleff);
            if (!$skill.keyAry) {
                return;
            }
            if ($skill) {
                $skill.reset();
                $skill.isDeath = false;
            }
            $skill.configFixEffect($char,$cb);
            this.skillMgr.playSkill($skill)
            return $skill;
        }

        public removeCharSkill($skill:Skill){
            $skill.removeSkillForce();
        }

        //清除场景中所有的对象模型
        public removeAllMovieDisplay(): void {
            while (this._displayRoleList.length > 0) {
                let display:Array<Display3dMovie> = this._displayRoleList.splice(0, 1);
                display[0].removeStage();
                display[0].destory();
            }
        }

        //移除场景对象
        public removeMovieDisplay($display: any): void {
            if(!$display)return;
            let index=this._displayRoleList.indexOf($display);
            if(index!=-1)
            {
                this._displayRoleList.splice(index, 1);
            }
            $display.removeStage();
            // $display.destory();
        }

        private onPlayCom(value: tl3d.BaseEvent): void {
            this.removeParticle(<tl3d.CombineParticle>(value.target))
        }

        //////////////////////////////////
        private _particleList: Array<CombineParticle>;
        private _particletime: number = 0;

        public updateParticles(): void {
            // for (var i: number = 0; i < this._particleList.length; i++) {
            //     this._particleList[i].update();
            // }
            this.updateRenderDic();
            this.clearPaticleVa();
        }

        public clearPaticleVa(): void {
            Scene_data.context3D.clearVa(2);
            Scene_data.context3D.clearVa(3);
            Scene_data.context3D.clearVa(4);
            Scene_data.context3D.clearVa(5);
        }

        public setParticleHide(): void {
            for (var i: number = 0; i < this._particleList.length; i++) {
                if (!this._particleList[i].dynamic) {
                    //  this._particleList[i].sceneVisible = false;
                }
            }
        }
        public get particleList(): Array<CombineParticle> {
            return this._particleList
        }

        public updateParticleTime(): void {
            var _tempTime: number = TimeUtil.getTimer(this.startTime);
            if (this._particletime == 0) { //开始
                this._particletime = _tempTime;
            }
            var t: number = _tempTime - this._particletime;
            this._particletime = _tempTime;
            for (var i: number = 0; i < this._particleList.length; i++) {
                if (!this._particleList[i].sceneVisible) {
                    continue;
                }
                this._particleList[i].updateTime(t);
            }

        }
        private renderDic: Object = new Object;
        private addRenderDic($particle: CombineParticle): void {
            var url: string = $particle.url;
            if (!this.renderDic[url]) {
                this.renderDic[url] = new Array;
            }

            this.renderDic[url].push($particle);

        }
        private removeRenderDic($particle: CombineParticle): void {
            var url: string = $particle.url;

            var indexs: number = this.renderDic[url].indexOf($particle);
            if (indexs == -1) {
                return;
            }
            this.renderDic[url].splice(indexs, 1);
            if (this.renderDic[url].length == 0) {
                delete this.renderDic[url];
            }
        }

        private updateRenderDic(): void {
            for (var key in this.renderDic) {
                var list: Array<CombineParticle> = this.renderDic[key];
                if (list.length == 1) {
                    list[0].update();
                } else {
                    var size: number = list[0].size;

                    for (var j: number = 0; j < size; j++) {
                        for (var i: number = 0; i < list.length; i++) {
                            list[i].updateItem(j);
                        }
                    }

                }

            }
        }

        public addParticle($particle: CombineParticle): void {
            if (this._particleList.lastIndexOf($particle) != -1) {
                return;
            }
            this._particleList.push($particle);
            this.addRenderDic($particle);
        }

        public removeParticle($particle: CombineParticle): void {
            var indexs: number = this._particleList.indexOf($particle);
            if (indexs == -1) {
                return;
            }
            this._particleList.splice(indexs, 1);
            this.removeRenderDic($particle);
            $particle.reset();
        }

        public clearAllParticle() {
            this._particletime = 0;
            while (this._particleList && this._particleList.length > 0) {
                let particle = this._particleList.pop();
                this.removeRenderDic(particle);
                particle.reset();
            }
        }


    }
}