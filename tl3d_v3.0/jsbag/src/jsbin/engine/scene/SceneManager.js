var SceneManager = /** @class */ (function () {
    function SceneManager() {
        //private _sceneLoader: SceneRes;
        this._ready = false;
        this.render = true;
        this.test = false;
        this._displayList = new Array;
        this._displaySpriteList = new Array;
        this._displayRoleList = new Array;
        this._display2DList = new Array;
        this._sceneParticleList = new Array;
        this._time = TimeUtil.getTimer();
        //this.initSceneLoader()
        this._sceneDic = new Object;
        //var buildShader: BuildShader = new BuildShader();
        //ProgrmaManager.getInstance().registe(BuildShader.buildShader, buildShader);
        //var skyShader: SkyShader = new SkyShader();
        //ProgrmaManager.getInstance().registe(SkyShader.Sky_Shader, skyShader);
        //ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader());
        this.initScene();
        this.viewFrustum = new ViewFrustum();
    }
    SceneManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new SceneManager();
        }
        return this._instance;
    };
    Object.defineProperty(SceneManager.prototype, "displayList", {
        get: function () {
            return this._displayList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "displayRoleList", {
        get: function () {
            return this._displayRoleList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "displaySpriteList", {
        get: function () {
            return this._displaySpriteList;
        },
        enumerable: true,
        configurable: true
    });
    // private initSceneLoader(): void {
    //     if (!Scene_data.supportBlob) {
    //         //this._sceneLoader = new SceneResLow();
    //     } else {
    //        // this._sceneLoader = new SceneRes();
    //     }
    // }
    SceneManager.prototype.clearScene = function () {
        //this.clearStaticScene();
        this._displayRoleList.length = 0;
    };
    SceneManager.prototype.clearStaticScene = function () {
        //console.log("场景场景所有对象");
        for (var key in this._sceneDic) {
            var obj = this._sceneDic[key];
            if (obj instanceof CombineParticle) {
                ParticleManager.getInstance().removeParticle(obj);
                obj.destory();
            }
            else if (obj instanceof Display3DSprite) {
                obj.removeStage();
                obj.destory();
            }
        }
        this._ready = false;
        this._sceneDic = null;
        this._sceneQuadTree = null;
        this._displayList.length = 0;
        this._sceneParticleList.length = 0;
        AstarUtil.porcessBak(false);
    };
    SceneManager.prototype.testUrl = function ($url) {
        return this._currentUrl == $url;
    };
    SceneManager.prototype.loadScene = function ($url, $completeFun, $progressFun, $analysisCompleteFun) {
        var _this = this;
        if (this._currentUrl == $url) {
            AstarUtil.porcessBak(true);
            this._ready = true;
            $completeFun();
            $analysisCompleteFun();
            return;
        }
        this.clearStaticScene();
        this._ready = false;
        ResManager.getInstance().loadSceneRes($url, $completeFun, $progressFun, function ($str) {
            _this.loadSceneConfigCom($str);
            $analysisCompleteFun();
        });
        this._currentUrl = $url;
    };
    SceneManager.prototype.addSceneImgBg = function (info) {
        var displayimg = new Display3dBg();
        displayimg.setImgInfo(info.url, info.width, info.height);
        this.addDisplay(displayimg);
    };
    SceneManager.prototype.getDisplayByID = function ($type, $id) {
        if ($type == 0) {
            return this._sceneDic["build" + $id];
        }
        else if ($type == 1) {
            return this._sceneDic["particle" + $id];
        }
    };
    SceneManager.prototype.fixAstart = function (pos) {
        for (var i = 0; i < this._displayRoleList.length; i++) {
            this._displayRoleList[i].fixAstartData(pos);
        }
    };
    SceneManager.prototype.loadSceneConfigCom = function (obj) {
        this._sceneDic = new Object();
        var groundAry = obj.groundItem;
        var buildAry = obj.buildItem;
        Scene_data.fogColor = [obj.fogColor.x / 255.0, obj.fogColor.y / 255.0, obj.fogColor.z / 255.0];
        //  //console.log(obj.fogDistance)
        var d = obj.fogDistance * 1; //1000
        var s = obj.fogAttenuation; //0.5.
        Scene_data.gameAngle = isNaN(obj.gameAngle) ? 0 : obj.gameAngle;
        Scene_data.focus3D.rotationY = Scene_data.gameAngle;
        Scene_data.fogData = [d * s, 1 / ((1 - s) * d)];
        Scene_data.sceneNumId++;
        for (var j = 0; groundAry && j < groundAry.length; j++) {
            var groundDisplay = this.getGroundSprite(groundAry[j], obj.terrain);
            this.addDisplay(groundDisplay);
        }
        for (var i = 0; i < buildAry.length; i++) {
            var itemObj = buildAry[i];
            if (itemObj.type == BaseRes.PREFAB_TYPE) {
                var itemDisplay = this.getBuildSprite(itemObj);
                this.addDisplay(itemDisplay);
            }
            else if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
                var particle = this.getParticleSprite(itemObj);
                ParticleManager.getInstance().addParticle(particle);
                this._sceneParticleList.push(particle);
            }
        }
        Scene_data.light.setData(obj.SunNrm, obj.SunLigth, obj.AmbientLight);
        LightProbeManager.getInstance().setLightProbeData(obj.lightProbeItem);
        AstarUtil.setData(obj.astar);
        this._ready = true;
        if (obj.quadTreeData) {
            this._sceneQuadTree = new SceneQuadTree();
            this._sceneQuadTree.init(obj.quadTreeData, this._sceneDic);
        }
        else {
            this._sceneQuadTree = null;
        }
        // this.viewFrustum.setData(obj.aabb);
        Scene_data.cam3D.astarRect = AstarUtil.areaRect;
    };
    SceneManager.prototype.getGroundSprite = function (itemObj, terrain) {
        var itemDisplay = new TerrainDisplay3DSprite();
        itemDisplay.setObjUrl(itemObj.objsurl);
        itemDisplay.setMaterialUrl(itemObj.materialurl, itemObj.materialInfoArr);
        itemDisplay.materialInfoArr = itemObj.materialInfoArr;
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
            itemDisplay.setGrounDataMesh(terrain[itemObj.id]);
        }
        this._sceneDic["ground" + itemObj.id] = itemDisplay;
        return itemDisplay;
    };
    SceneManager.prototype.makeCollisioin = function (arr) {
    };
    Object.defineProperty(SceneManager.prototype, "ready", {
        get: function () {
            return this._ready;
        },
        set: function ($value) {
            //console.log("--setready--", $value);
            this._ready = $value;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.getBuildSprite = function (itemObj) {
        var itemDisplay = new Display3DSprite();
        itemDisplay.setObjUrl(itemObj.objsurl);
        itemDisplay.setMaterialUrl(itemObj.materialurl, itemObj.materialInfoArr);
        itemDisplay.materialInfoArr = itemObj.materialInfoArr;
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
    };
    SceneManager.prototype.getParticleSprite = function (itemObj) {
        var particle;
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
    };
    SceneManager.prototype.initScene = function () {
        return;
        //this._displayList.push(new GridLineSprite());
    };
    SceneManager.prototype.addDisplay = function ($display) {
        if (this._displayList.indexOf($display) != -1) {
            return;
        }
        this._displayList.push($display);
        $display.addStage();
    };
    SceneManager.prototype.removeDisplay = function ($display) {
        var index = this._displayList.indexOf($display);
        if (index != -1) {
            this._displayList.splice(index, 1);
        }
        $display.removeStage();
    };
    /**
     * 动态添加的staticMesh 物件例如武器等
    */
    SceneManager.prototype.addSpriteDisplay = function ($display) {
        if (this._displaySpriteList.indexOf($display) != -1) {
            return;
        }
        $display.addStage();
        for (var i = 0; i < this._displaySpriteList.length; i++) {
            if (this._displaySpriteList[i].materialUrl == $display.materialUrl) {
                this._displaySpriteList.splice(i, 0, $display);
                return;
            }
        }
        this._displaySpriteList.push($display);
    };
    SceneManager.prototype.removeSpriteDisplay = function ($display) {
        var index = this._displaySpriteList.indexOf($display);
        if (index != -1) {
            this._displaySpriteList.splice(index, 1);
        }
        $display.removeStage();
    };
    /**
     * 动态添加的骨骼动画角色
     */
    SceneManager.prototype.addMovieDisplay = function ($display) {
        this._displayRoleList.push($display);
        $display.addStage();
    };
    SceneManager.prototype.addMovieDisplayTop = function ($display) {
        this._displayRoleList.unshift($display);
        $display.addStage();
    };
    SceneManager.prototype.removeMovieDisplay = function ($display) {
        var index = this._displayRoleList.indexOf($display);
        if (index != -1) {
            this._displayRoleList.splice(index, 1);
        }
        $display.removeStage();
    };
    SceneManager.prototype.setParticleVisible = function () {
        var $arr = ParticleManager.getInstance().particleList;
        for (var i = 0; $arr && i < $arr.length; i++) {
            if (!$arr[i].dynamic && $arr[i].bindVecter3d) {
                var dis = Vector3D.distance(new Vector3D(Scene_data.focus3D.x, Scene_data.focus3D.y, Scene_data.focus3D.z), new Vector3D($arr[i].x, $arr[i].y, $arr[i].z));
                $arr[i].sceneVisible = (dis < 1000);
            }
        }
    };
    SceneManager.prototype.update = function () {
        if (this.test) {
            return;
        }
        if (this._sceneQuadTree) {
            this._sceneQuadTree.setCircle(Scene_data.focus3D.x, Scene_data.focus3D.z, SceneManager.mapQudaTreeDistance);
            if (this._sceneQuadTree.needUpdata) {
                for (var i = 0; i < this._displayList.length; i++) {
                    this._displayList[i].sceneVisible = false;
                    this._displayList[i].sceneVisible = true;
                }
                this.setParticleVisible();
                this._sceneQuadTree.update();
                this.mathCamFar();
            }
        }
        Scene_data.context3D.update();
        Scene_data.context3D.setDepthTest(false);
        UIManager.getInstance().upBgGroundZero();
        Scene_data.context3D.setDepthTest(true);
        this.updateMovieFrame();
        MathClass.getCamView(Scene_data.cam3D, Scene_data.focus3D); //一定要角色帧渲染后再重置镜头矩阵
        if (this._ready) {
            ParticleManager.getInstance().updateTime();
            SkillManager.getInstance().update();
            if (this.render) {
                this.updateStaticDiplay();
                this.updateSpriteDisplay();
                Scene_data.context3D.setWriteDepth(true);
                Scene_data.context3D.clearTest();
                this.updateMovieDisplay();
                ShadowManager.getInstance().update();
                Scene_data.context3D.setWriteDepth(false);
                ParticleManager.getInstance().update();
                BloodManager.getInstance().update();
            }
        }
        Scene_data.context3D.setDepthTest(false);
        UIManager.getInstance().update();
        // msgtip.MsgTipManager.getInstance().update()
        for (var i = 0; i < this._display2DList.length; i++) {
            this._display2DList[i].update();
        }
    };
    SceneManager.prototype.updateFBO = function () {
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
    };
    SceneManager.prototype.addDisplay2DList = function ($dis) {
        this._display2DList.push($dis);
    };
    SceneManager.prototype.mathCamFar = function () {
        var $p = new Vector3D;
        var $far = 0;
        for (var i = 0; i < this._displayList.length; i++) {
            var $dis = this._displayList[i];
            if ($dis.sceneVisible && $dis.aabb) {
                var $m = $dis.posMatrix.clone();
                $m.append(Scene_data.cam3D.cameraMatrix);
                var $aabbVect = $dis.aabbVect;
                for (var k = 0; k < $aabbVect.length; k++) {
                    $p = Scene_data.cam3D.cameraMatrix.transformVector($aabbVect[k]);
                    if ($p.z > $far) {
                        $far = $p.z;
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
        Scene_data.camFar = Math.max(500, $far + 100);
        Engine.resetViewMatrx3D();
    };
    SceneManager.prototype.updateStaticDiplay = function () {
        var num = 0;
        for (var i = 0; i < this._displayList.length; i++) {
            this._displayList[i].update();
            // if (this._displayList[i].sceneVisible) {
            //     num++;
            // }
        }
        // FpsMc.tipStr = "drawNum:" + (num + this._displayRoleList.length) + "/" + this._displayList.length; 
    };
    SceneManager.prototype.updateStaticBind = function () {
        // for (var i: number = 0; i < this._displayList.length; i++) {
        //     this._displayList[i].updateBind();
        // }
    };
    SceneManager.prototype.updateSpriteDisplay = function () {
        for (var i = 0; i < this._displaySpriteList.length; i++) {
            this._displaySpriteList[i].update();
        }
    };
    SceneManager.prototype.updateMovieDisplay = function () {
        for (var i = 0; i < this._displayRoleList.length; i++) {
            this._displayRoleList[i].update();
        }
    };
    SceneManager.prototype.updateMovieFrame = function () {
        var t = TimeUtil.getTimer();
        var delay = t - this._time;
        this._time = t;
        for (var i = 0; i < this._displayRoleList.length; i++) {
            this._displayRoleList[i].updateFrame(delay);
        }
        //  FpsMc.tipStr = "人数:" + (this._displayRoleList.length) 
    };
    SceneManager.mapQudaTreeDistance = 200;
    return SceneManager;
}());
//# sourceMappingURL=SceneManager.js.map