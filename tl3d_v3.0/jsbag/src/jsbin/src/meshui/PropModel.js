var prop;
(function (prop) {
    var PropModel = /** @class */ (function () {
        function PropModel() {
            this.propPanle = new prop.UiMeshSprite();
            this.propPanle.x = 500;
            this.propPanle.y = 100;
            AppData.rightPanel.addChild(this.propPanle);
        }
        PropModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new PropModel();
            }
            return this._instance;
        };
        PropModel.prototype.resize = function () {
            if (this.metaDataView) {
                this.metaDataView.width = Pan3d.Scene_data.stageWidth - this.propPanle.x;
            }
        };
        PropModel.prototype.hidePanel = function () {
            if (this.metaDataView) {
                this.metaDataView.destory();
                this.metaDataView = null;
            }
            this.lastNodel = null;
        };
        PropModel.prototype.showTextureUiPanel = function ($ui) {
            if (this.lastNodel != $ui) {
                var propPanle = prop.PropModel.getInstance().propPanle;
                var tempView;
                if ($ui instanceof materialui.ConstVec3NodeUI) {
                    tempView = new prop.Vec3PropMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.ConstVec2NodeUI) {
                    tempView = new prop.Vec2PropMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.ConstFloatNodeUI) {
                    tempView = new prop.FloatPropMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.TimeNodeUI) {
                    tempView = new prop.NodeTimePropPanel(propPanle);
                }
                else if ($ui instanceof materialui.PannerNodeUI) {
                    tempView = new prop.PannerPropPanel(propPanle);
                }
                else if ($ui instanceof materialui.TextureSampleNodeUI) {
                    tempView = new prop.TexturePropMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.Texture3DNodeUI) {
                    tempView = new prop.Texture3DMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.TextureCubeNodeUI) {
                    tempView = new prop.TextureCubeMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.ResultNodeUI) {
                    tempView = new prop.OpPropMeshPanel(propPanle);
                }
                else if ($ui instanceof materialui.MathFunNodeUI) {
                    tempView = new prop.MathFunMeshPanel(propPanle);
                }
                else {
                    tempView = new prop.SciencePropMeshPanel(propPanle);
                }
                this.lastNodel = $ui;
                tempView.data = $ui;
                tempView.type = "材质";
                this.showOtherMeshView(tempView);
            }
        };
        PropModel.prototype.clearOladMeshView = function () {
            if (this.metaDataView) {
                this.metaDataView.destory();
                this.metaDataView = null;
                this.lastNodel = null;
            }
        };
        PropModel.prototype.showOtherMeshView = function (value) {
            if (this.metaDataView != value) {
                this.clearOladMeshView();
            }
            this.metaDataView = value;
            this.metaDataView.top = 25;
            this.metaDataView.refreshViewValue();
            this.resize();
            var rightPanel = AppData.rightPanel;
            rightPanel.mainRightBaseWin.pushViewToTab(this.metaDataView);
        };
        return PropModel;
    }());
    prop.PropModel = PropModel;
})(prop || (prop = {}));
//# sourceMappingURL=PropModel.js.map