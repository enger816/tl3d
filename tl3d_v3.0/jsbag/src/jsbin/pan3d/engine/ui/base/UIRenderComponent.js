var Pan3d;
(function (Pan3d) {
    var UIRenderComponent = /** @class */ (function () {
        function UIRenderComponent() {
            this._rendering = false;
            this.scale = 1;
            this.sortnum = 0; //排序编号
            this.blenderMode = 0;
            this.renderData = new Float32Array(0);
            this.renderData2 = new Float32Array(0);
            this.num = 0;
            this.visible = true;
            this.initData();
        }
        Object.defineProperty(UIRenderComponent.prototype, "uiListLen", {
            get: function () {
                return this._uiList.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRenderComponent.prototype, "rendering", {
            get: function () {
                return this._rendering;
            },
            set: function (val) {
                this._rendering = val;
                if (this._uiList) {
                    for (var i = 0; i < this._uiList.length; i++) {
                        this._uiList[i].rendering = val;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIRenderComponent.prototype, "texture", {
            get: function () {
                if (this.textureRes) {
                    return this.textureRes.texture;
                }
                else {
                    return null;
                }
            },
            enumerable: true,
            configurable: true
        });
        UIRenderComponent.prototype.initData = function () {
            this._uiList = new Array;
            //   this.container = new UIConatiner();
            this.objData = new Pan3d.ObjData();
            this.shader = Pan3d.ProgrmaManager.getInstance().getProgram(Pan3d.UIShader.UI_SHADER);
            this.program = this.shader.program;
            this.uiProLocation = Pan3d.Scene_data.context3D.getLocation(this.program, "ui");
            this.ui2ProLocation = Pan3d.Scene_data.context3D.getLocation(this.program, "ui2");
        };
        UIRenderComponent.prototype.resize = function () {
        };
        UIRenderComponent.prototype.setImgUrl = function ($url) {
            var _this = this;
            Pan3d.TextureManager.getInstance().getTexture(Pan3d.Scene_data.fileRoot + $url, function ($texture) {
                _this.textureRes = $texture;
            });
        };
        UIRenderComponent.prototype.setInfo = function (configUrl, imgUrl, $fun) {
            this.uiAtlas = new Pan3d.UIAtlas;
            this.uiAtlas.setInfo(configUrl, imgUrl, function () {
                $fun();
            });
        };
        UIRenderComponent.prototype.setAtlas = function ($atlas) {
            this.uiAtlas = $atlas;
        };
        UIRenderComponent.prototype.creatComponent = function ($tx, $ty, $tw, $th) {
            var ui = new Pan3d.UICompenent();
            ui.tr.sets($tx, $ty, $tw, $th);
            ui.uiRender = this;
            return ui;
        };
        UIRenderComponent.prototype.getComponent = function ($uiName) {
            var obj = this.uiAtlas.getLayoutData($uiName);
            if (obj) {
                var types = obj.type;
                if (types == 0) {
                    var ui = this.creatBaseComponent(obj.dataItem[0]);
                    ui.width = obj.rect.width;
                    ui.height = obj.rect.height;
                    ui.x = obj.rect.x;
                    ui.y = obj.rect.y;
                    ui.baseRec = obj.rect;
                    ui.name = $uiName;
                    return ui;
                }
                else if (types == 1) {
                    var g9ui = this.creatGrid9Component(obj.dataItem[0], obj.rect.width, obj.rect.height);
                    g9ui.x = obj.rect.x;
                    g9ui.y = obj.rect.y;
                    g9ui.baseRec = obj.rect;
                    g9ui.name = $uiName;
                    return g9ui;
                }
                else if (types == 2) {
                    if (obj.selected) {
                        var sbtn = this.createSelectButton(obj.dataItem[0], obj.dataItem[1]);
                        sbtn.width = obj.rect.width;
                        sbtn.height = obj.rect.height;
                        sbtn.x = obj.rect.x;
                        sbtn.y = obj.rect.y;
                        sbtn.baseRec = obj.rect;
                        sbtn.name = $uiName;
                        return sbtn;
                    }
                    else {
                        var btn = this.creatButton(obj.dataItem[0], obj.dataItem[1]);
                        btn.width = obj.rect.width;
                        btn.height = obj.rect.height;
                        btn.x = obj.rect.x;
                        btn.y = obj.rect.y;
                        btn.baseRec = obj.rect;
                        btn.name = $uiName;
                        return btn;
                    }
                }
                else if (types == 4) {
                    var sFrame = this.createFrame(obj.dataItem[0]);
                    sFrame.width = obj.rect.width;
                    sFrame.height = obj.rect.height;
                    sFrame.x = obj.rect.x;
                    sFrame.y = obj.rect.y;
                    sFrame.baseRec = obj.rect;
                    sFrame.name = $uiName;
                    return sFrame;
                }
            }
            return null;
        };
        UIRenderComponent.prototype.createFrame = function ($upskin) {
            var frameMc = new Pan3d.FrameCompenent;
            frameMc.skinName = $upskin;
            var rec = this.uiAtlas.getRec($upskin);
            frameMc.setFrameData(rec);
            frameMc.uiRender = this;
            return frameMc;
        };
        UIRenderComponent.prototype.creatBaseComponent = function ($skinName) {
            var ui = new Pan3d.UICompenent();
            ui.skinName = $skinName;
            var rec = this.uiAtlas.getRec($skinName);
            ui.tr.setRec(rec);
            ui.width = rec.pixelWitdh;
            ui.height = rec.pixelHeight;
            ui.uiRender = this;
            return ui;
        };
        UIRenderComponent.prototype.creatGrid9Component = function ($skinName, $width, $height) {
            var ui = new Pan3d.Grid9Compenent();
            ui.skinName = $skinName;
            var rec = this.uiAtlas.getGridRec($skinName);
            ui.tr.setRec(rec);
            ui.ogw = rec.ogw;
            ui.ogh = rec.ogh;
            ui.gw = ui.ogw / rec.pixelWitdh;
            ui.gh = ui.ogh / rec.pixelHeight;
            ui.width = $width;
            ui.height = $height;
            ui.uiRender = this;
            return ui;
        };
        UIRenderComponent.prototype.creatButton = function ($upskin, $downskin) {
            if (!this.uiAtlas.hasData) {
                return null;
            }
            var btn = new Pan3d.Button;
            var rec = this.uiAtlas.getRec($upskin);
            btn.tr.setRec(rec);
            btn.trDown.setRec(this.uiAtlas.getRec($downskin));
            btn.width = rec.pixelWitdh;
            btn.height = rec.pixelHeight;
            btn.uiRender = this;
            return btn;
        };
        UIRenderComponent.prototype.createSelectButton = function ($upskin, $selectedskin) {
            if (!this.uiAtlas.hasData) {
                return null;
            }
            var btn = new Pan3d.SelectButton;
            var rec = this.uiAtlas.getRec($upskin);
            btn.tr.setRec(rec);
            btn.trDown.setRec(this.uiAtlas.getRec($selectedskin));
            btn.width = rec.pixelWitdh;
            btn.height = rec.pixelHeight;
            btn.uiRender = this;
            return btn;
        };
        UIRenderComponent.prototype.addRenderUI = function (ui) {
            if (this._uiList.length >= 50) {
                //console.log("UIRenderComponent超限制51")
                alert("UIRenderComponent超限制51");
                return;
            }
            this._uiList.push(ui);
            ui.rendering = this.rendering;
            //this._uiList.sort((a: UICompenent, b: UICompenent) => { return a.z > b.z ? -1 : 1 });
            this.applyObjData();
        };
        UIRenderComponent.prototype.removeRenderUI = function (ui) {
            var index = this._uiList.indexOf(ui);
            if (index != -1) {
                this._uiList.splice(index, 1);
            }
            ui.rendering = false;
            this.applyObjData();
        };
        UIRenderComponent.prototype.applyObjData = function () {
            this.objData.vertices.length = 0;
            this.objData.uvs.length = 0;
            this.objData.indexs.length = 0;
            //var wh: number = 20;
            var beginIndex = 0;
            for (var i = 0; i < this._uiList.length; i++) {
                var ui = this._uiList[i];
                if (ui.isVirtual) {
                    continue;
                }
                //this.objData.vertices.push(
                //    0, 0, 0, 
                //    1, 0, 0,
                //    1, -1, 0,
                //    0, -1, 0);
                //this.objData.uvs.push(
                //    0, 0, i,
                //    1, 0, i,
                //    1, 1, i,
                //    0, 1, i);
                //this.objData.indexs.push(i * 4, 1 + i * 4, 2 + i * 4, i * 4, 2 + i * 4, 3 + i * 4);
                beginIndex = ui.pushVaData(this.objData, i, beginIndex);
            }
            this.objData.treNum = this.objData.indexs.length;
            if (this.objData.vertexBuffer) {
                Pan3d.Scene_data.context3D.uploadBuff3DByBuffer(this.objData.vertexBuffer, this.objData.vertices);
                Pan3d.Scene_data.context3D.uploadBuff3DByBuffer(this.objData.uvBuffer, this.objData.uvs);
                Pan3d.Scene_data.context3D.uploadIndexBuff3DByBuffer(this.objData.indexBuffer, this.objData.indexs);
            }
            else {
                this.objData.vertexBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.vertices);
                this.objData.uvBuffer = Pan3d.Scene_data.context3D.uploadBuff3D(this.objData.uvs);
                this.objData.indexBuffer = Pan3d.Scene_data.context3D.uploadIndexBuff3D(this.objData.indexs);
            }
            if (this.mask) {
                this.mask.scale = this.scale;
                this.mask.applyAbsolutePoint();
            }
            this.makeRenderDataVc(-1);
        };
        //-1为所有都需要更新;
        UIRenderComponent.prototype.makeRenderDataVc = function ($vcId) {
            if (!this.renderData || (this.renderData && this.renderData.length != this._uiList.length * 4)) {
                //if (this.renderData.length != this._uiList.length * 4) {
                //  //console.log(this.renderData.length, this._uiList.length * 4, "$vcId", $vcId)
                //}
                this.renderData = new Float32Array(this._uiList.length * 4);
                this.renderData2 = new Float32Array(this._uiList.length * 4);
            }
            if ($vcId == -1) {
                for (var i = 0; this._uiList && i < this._uiList.length; i++) {
                    this._uiList[i].vcId = i;
                    this.renderData[i * 4 + 0] = this._uiList[i].renderData[0];
                    this.renderData[i * 4 + 1] = this._uiList[i].renderData[1];
                    this.renderData[i * 4 + 2] = this._uiList[i].renderData[2];
                    this.renderData[i * 4 + 3] = this._uiList[i].renderData[3];
                    this.renderData2[i * 4 + 0] = this._uiList[i].renderData2[0];
                    this.renderData2[i * 4 + 1] = this._uiList[i].renderData2[1];
                    this.renderData2[i * 4 + 2] = this._uiList[i].renderData2[2];
                    this.renderData2[i * 4 + 3] = this._uiList[i].renderData2[3];
                }
            }
            else {
                if ($vcId < this._uiList.length) {
                    this.renderData[$vcId * 4 + 0] = this._uiList[$vcId].renderData[0];
                    this.renderData[$vcId * 4 + 1] = this._uiList[$vcId].renderData[1];
                    this.renderData[$vcId * 4 + 2] = this._uiList[$vcId].renderData[2];
                    this.renderData[$vcId * 4 + 3] = this._uiList[$vcId].renderData[3];
                    this.renderData2[$vcId * 4 + 0] = this._uiList[$vcId].renderData2[0];
                    this.renderData2[$vcId * 4 + 1] = this._uiList[$vcId].renderData2[1];
                    this.renderData2[$vcId * 4 + 2] = this._uiList[$vcId].renderData2[2];
                    this.renderData2[$vcId * 4 + 3] = this._uiList[$vcId].renderData2[3];
                }
            }
        };
        UIRenderComponent.prototype.update = function () {
            if (!this.visible || this._uiList.length == 0) {
                if (this.modelRenderList && this.modelRenderList.length) {
                }
                else {
                    return;
                }
            }
            if (this.mask) {
                var gl = Pan3d.Scene_data.context3D.renderContext;
                gl.enable(gl.STENCIL_TEST);
                gl.stencilFunc(gl.NEVER, this.mask.level, 0xFF);
                gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE);
                this.mask.update();
                gl.stencilFunc(gl.LESS, this.mask.level - 1, 0xFF);
                /*
                var renderContext: WebGLRenderingContext = Scene_data.context3D.renderContext;
                renderContext.enable(renderContext.STENCIL_TEST);
                renderContext.stencilMask(0xFF);
                renderContext.stencilFunc(renderContext.NEVER, this.mask.level, 0xFF);
                renderContext.stencilOp(renderContext.REPLACE, renderContext.REPLACE, renderContext.REPLACE);
                this.mask.update();
                renderContext.stencilFunc(renderContext.LESS, this.mask.level - 1, 0xFF);
                renderContext.stencilOp(renderContext.KEEP, renderContext.KEEP, renderContext.KEEP);
                */
            }
            Pan3d.Scene_data.context3D.setBlendParticleFactors(this.blenderMode);
            ////console.log(this.shader.name);
            Pan3d.Scene_data.context3D.setProgram(this.program);
            this.setVc();
            Pan3d.Scene_data.context3D.setVa(0, 3, this.objData.vertexBuffer);
            Pan3d.Scene_data.context3D.setVa(1, 3, this.objData.uvBuffer);
            this.setTextureToGpu();
            Pan3d.Scene_data.context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
            if (this.mask) {
                Pan3d.Scene_data.context3D.renderContext.disable(Pan3d.Scene_data.context3D.renderContext.STENCIL_TEST);
            }
            if (this.modelRenderList) {
                for (var i = 0; i < this.modelRenderList.length; i++) {
                    this.modelRenderList[i].update();
                }
            }
        };
        UIRenderComponent.prototype.setTextureToGpu = function () {
            if (this.uiAtlas) {
                Pan3d.Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.uiAtlas.texture, 0);
            }
            else {
                Pan3d.Scene_data.context3D.setRenderTexture(this.shader, "s_texture", this.texture, 0);
            }
        };
        UIRenderComponent.prototype.setVc = function () {
            // for (var i: number = 0; i < this._uiList.length; i++) {
            //     this._uiList[i].update();
            //     this._uiList[i].setVc(this.program, i);
            // }
            for (var i = 0; i < this._uiList.length; i++) {
                this._uiList[i].update();
                if (this._uiList[i].vcId != i) {
                    // //console.log(this._uiList[i].vcId , i)
                }
            }
            Pan3d.Scene_data.context3D.setVc4fvLocation(this.uiProLocation, this.renderData);
            Pan3d.Scene_data.context3D.setVc4fvLocation(this.ui2ProLocation, this.renderData2);
        };
        UIRenderComponent.prototype.addModel = function ($display) {
            if (!this.modelRenderList) {
                this.modelRenderList = new Array;
            }
            var idx = this.modelRenderList.indexOf($display);
            if (idx != -1) {
                return;
            }
            this.modelRenderList.push($display);
        };
        UIRenderComponent.prototype.removeModel = function ($display) {
            var idx = this.modelRenderList.indexOf($display);
            if (idx != -1) {
                this.modelRenderList.splice(idx, 1);
            }
        };
        UIRenderComponent.prototype.insetUi = function ($e) {
            for (var i = 0; i < this._uiList.length; i++) {
                if (this._uiList[i].testPoint($e.x, $e.y)) {
                    return this._uiList[i];
                }
            }
            return null;
        };
        UIRenderComponent.prototype.interactiveEvent = function ($e) {
            if (this.mask) {
                if (!this.mask.testPoint($e.x, $e.y)) {
                    return false;
                }
            }
            var tf = false;
            for (var i = 0; i < this._uiList.length; i++) {
                if (this._uiList[i].interactiveEvent($e) && Pan3d.UIManager.cando) {
                    tf = true;
                    Pan3d.UIManager.cando = false;
                    return true;
                }
            }
            return tf;
        };
        UIRenderComponent.prototype.dispose = function () {
            this.objData.destory();
            this.objData = null;
            if (this.uiAtlas) {
                this.uiAtlas.dispose();
                this.uiAtlas = null;
            }
            if (this.mask) {
                this.mask.dispose();
                this.mask = null;
            }
            this.renderData = null;
            this.renderData2 = null;
        };
        return UIRenderComponent;
    }());
    Pan3d.UIRenderComponent = UIRenderComponent;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=UIRenderComponent.js.map