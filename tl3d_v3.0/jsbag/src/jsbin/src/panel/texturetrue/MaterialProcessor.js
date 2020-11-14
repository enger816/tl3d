var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var materialui;
(function (materialui) {
    var BaseEvent = Pan3d.BaseEvent;
    var Vector2D = Pan3d.Vector2D;
    var Module = Pan3d.Module;
    var BaseProcessor = Pan3d.BaseProcessor;
    var UIManager = Pan3d.UIManager;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var KeyboardType = Pan3d.KeyboardType;
    var MouseType = Pan3d.MouseType;
    var Rectangle = Pan3d.Rectangle;
    var UIAtlas = Pan3d.UIAtlas;
    var LayerManager = win.LayerManager;
    var MaterialEvent = /** @class */ (function (_super) {
        __extends(MaterialEvent, _super);
        function MaterialEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MaterialEvent.INIT_MATERIA_PANEL = "INIT_MATERIA_PANEL"; //
        MaterialEvent.SHOW_MATERIA_PANEL = "SHOW_MATERIA_PANEL"; //
        MaterialEvent.SAVE_MATERIA_PANEL = "SAVE_MATERIA_PANEL"; //
        MaterialEvent.SELECT_MATERIAL_NODE_UI = "SELECT_MATERIAL_NODE_UI"; //
        MaterialEvent.COMPILE_MATERIAL = "COMPILE_MATERIAL"; //
        MaterialEvent.INUPT_NEW_MATERIAL_FILE = "CLEAR_MATERIAL_ALL_UI"; //
        return MaterialEvent;
    }(BaseEvent));
    materialui.MaterialEvent = MaterialEvent;
    var MaterialModule = /** @class */ (function (_super) {
        __extends(MaterialModule, _super);
        function MaterialModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MaterialModule.prototype.getModuleName = function () {
            return "MaterialModule";
        };
        MaterialModule.prototype.listProcessors = function () {
            return [new MaterialProcessor()];
        };
        return MaterialModule;
    }(Module));
    materialui.MaterialModule = MaterialModule;
    var MaterialProcessor = /** @class */ (function (_super) {
        __extends(MaterialProcessor, _super);
        function MaterialProcessor() {
            return _super.call(this) || this;
        }
        MaterialProcessor.prototype.getName = function () {
            return "MaterialProcessor";
        };
        MaterialProcessor.prototype.receivedModuleEvent = function ($event) {
            var _this = this;
            if ($event instanceof MaterialEvent) {
                var $materialEvent = $event;
                if ($materialEvent.type == MaterialEvent.INIT_MATERIA_PANEL) {
                    materialui.MaterialModel.getInstance().makePanle();
                    AppData.stagePos = new Vector2D();
                    materialui.BaseMaterialNodeUI.baseUIAtlas = new UIAtlas();
                    materialui.BaseMaterialNodeUI.baseUIAtlas.setInfo("pan/marmoset/uilist/baseui.txt", "pan/marmoset/uilist/baseui.png", function () { _this.loadConfigCom(); });
                    // this.baseWindow = new win.BaseWindow()
                }
                if ($materialEvent.type == MaterialEvent.SHOW_MATERIA_PANEL) {
                    this.lastMaterialUrl = $materialEvent.data;
                    // AppData.centenPanel.addUIContainer(this.baseWindow)
                    LayerManager.getInstance().addPanel(materialui.MaterialCtrl.getInstance().bgwinPanel, 1);
                    LayerManager.getInstance().addPanel(materialui.MaterialCtrl.getInstance().nodeUiPanel, 2);
                    LayerManager.getInstance().addPanel(materialui.MaterialCtrl.getInstance().linePanel, 3);
                    editscene.EditTopMenuPanel.getInstance().makeTextureTopMenu();
                    ModuleEventManager.dispatchEvent(new xyz.MoveScaleRotatioinEvent(xyz.MoveScaleRotatioinEvent.CLEAR_XYZ_MOVE_DATA));
                    ModuleEventManager.dispatchEvent(new materialleft.MaterialLeftEvent(materialleft.MaterialLeftEvent.SHOW_MATERIAL_LEFT_PANEL));
                    materialui.MaterialModel.getInstance().selectMaterialUrl(this.lastMaterialUrl);
                    this.addEvents();
                }
                if ($materialEvent.type == MaterialEvent.SAVE_MATERIA_PANEL) {
                    this.saveMateriaPanel();
                }
                if ($materialEvent.type == MaterialEvent.SELECT_MATERIAL_NODE_UI) {
                    this.selectNodeUi($materialEvent.data);
                }
                if ($materialEvent.type == MaterialEvent.COMPILE_MATERIAL) {
                    materialui.MaterialCompile.getInstance().compile(materialui.MaterialCtrl.getInstance().nodeList, this.baseMaterialTree);
                    this.changeLeftMeshView();
                }
                if ($materialEvent.type == MaterialEvent.INUPT_NEW_MATERIAL_FILE) {
                    this.clearAllMaterialUi($materialEvent.data);
                }
            }
            if ($event instanceof materialui.MEvent_Material_Connect) {
                var $mevent_Material_Connect = $event;
                if ($mevent_Material_Connect.type == materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_STARTDRAG) {
                    this.startDragLine($mevent_Material_Connect.itemNode);
                }
                if ($mevent_Material_Connect.type == materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_STOPDRAG) {
                    this.stopDragLine($mevent_Material_Connect.itemNode);
                }
                if ($mevent_Material_Connect.type == materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_REMOVELINE) {
                    this.removeLine($mevent_Material_Connect.line);
                }
                if ($mevent_Material_Connect.type == materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_DOUBLUELINE) {
                    this.setConnetLine($mevent_Material_Connect.startNode, $mevent_Material_Connect.endNode);
                }
            }
        };
        MaterialProcessor.prototype.changeLeftMeshView = function () {
            this._materialTree = new materialui.MaterialTree();
            this._materialTree.data = materialui.MaterialCtrl.getInstance().getObj();
            this._materialTree.url = this.lastMaterialUrl;
            materialui.MaterialModel.getInstance().MakeTempWebMaterialTree(this._materialTree, this.getMakeProgemePrame());
        };
        Object.defineProperty(MaterialProcessor.prototype, "hasStage", {
            get: function () {
                return AppData.sceneEidtType == 2;
            },
            enumerable: true,
            configurable: true
        });
        MaterialProcessor.prototype.addEvents = function () {
            var _this = this;
            if (!this.onMouseWheelFun) {
                this.onMouseWheelFun = function ($evt) { _this.onMouseWheel($evt); };
                this.onMouseFun = function ($evt) { _this.onMouse($evt); };
                this.onMouseMoveFun = function ($evt) { _this.onMouseMove($evt); };
                this.onMouseUpFun = function ($evt) { _this.onMouseUp($evt); };
                this.onKeyDownFun = function ($evt) { _this.onKeyDown($evt); };
                this.onKeyUpFun = function ($evt) { _this.onKeyUp($evt); };
                this.onRightMenuFun = function ($evt) { _this.onRightMenu($evt); };
            }
            document.addEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.addEventListener(MouseType.MouseDown, this.onMouseFun);
            document.addEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.addEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.addEventListener(MouseType.KeyDown, this.onKeyDownFun);
            document.addEventListener(MouseType.KeyUp, this.onKeyUpFun);
            document.addEventListener("contextmenu", this.onRightMenuFun);
        };
        MaterialProcessor.prototype.onRightMenu = function ($evt) {
            $evt.preventDefault();
            if (!this.hasStage) {
                return;
            }
            if (!AppData.centenPanel.rect.isHitByPoint($evt.x, $evt.y)) {
                return;
            }
            materialui.MaterialModel.getInstance().mekeMaterialRightMenu($evt);
            /*

            var $rightMenuEvet: rightmenu.RightMenuEvent = new rightmenu.RightMenuEvent(rightmenu.RightMenuEvent.SHOW_RIGHT_MENU);
            $rightMenuEvet.posv2d = new Vector2D($evt.clientX, $evt.clientY);
            ModuleEventManager.dispatchEvent($rightMenuEvet);

            */
        };
        MaterialProcessor.prototype.removeEvents = function () {
            document.removeEventListener(MouseType.MouseWheel, this.onMouseWheelFun);
            document.removeEventListener(MouseType.MouseDown, this.onMouseFun);
            document.removeEventListener(MouseType.MouseMove, this.onMouseMoveFun);
            document.removeEventListener(MouseType.MouseUp, this.onMouseUpFun);
            document.removeEventListener(MouseType.KeyDown, this.onKeyDownFun);
            document.removeEventListener(MouseType.KeyUp, this.onKeyUpFun);
        };
        MaterialProcessor.prototype.clearAllMaterialUi = function ($materailTree) {
            var $containerList = materialui.MaterialCtrl.getInstance().nodeUiPanel._containerList;
            var $len = $containerList.length;
            for (var i = ($len - 1); i >= 0; i--) {
                var $temp = $containerList[i];
                if ($temp.name) {
                    this.delUI($temp);
                }
            }
            this.stageMoveTx(new Vector2D(-AppData.stagePos.x, -AppData.stagePos.y));
            materialui.MtlUiData.Scale = 1;
            materialui.MaterialCtrl.getInstance().initData();
            this.baseMaterialTree = $materailTree;
            materialui.MaterialViewBuildUtils.getInstance().setData($materailTree.data);
            this.resetMaterialListUi();
            left.ModelShowModel.getInstance().modelSprite.material = $materailTree;
        };
        MaterialProcessor.prototype.resetMaterialListUi = function () {
            var $containerList = materialui.MaterialCtrl.getInstance().nodeUiPanel._containerList;
            var $len = $containerList.length;
            var $rect;
            for (var i = 0; i < $len; i++) {
                var $ui = $containerList[i];
                if ($ui.name) {
                    var temp = new Rectangle($ui.x, $ui.y, $ui.x + $ui.width, $ui.y + $ui.height);
                    if ($rect) {
                        $rect.x = Math.min($rect.x, temp.x);
                        $rect.y = Math.min($rect.y, temp.y);
                        $rect.width = Math.max($rect.width, temp.x);
                        $rect.height = Math.max($rect.height, temp.y);
                    }
                    else {
                        $rect = new Rectangle(temp.x, temp.y, temp.x, temp.y);
                    }
                }
            }
            if ($rect) {
                var pageRect = new Rectangle();
                pageRect.x = AppData.centenPanel.rect.x;
                pageRect.y = AppData.centenPanel.rect.y + 15;
                pageRect.width = AppData.centenPanel.rect.width;
                pageRect.height = AppData.centenPanel.rect.height - 40;
                $rect.width = ($rect.width - $rect.x) + 180;
                $rect.height = ($rect.height - $rect.y) + 200;
                //重新载入的材质适配到可显示位置
                var scaleNum = (Math.min(pageRect.width / $rect.width, pageRect.height / $rect.height));
                scaleNum = Math.min(scaleNum, 0.8);
                scaleNum = Math.max(scaleNum, 0.5);
                materialui.MtlUiData.Scale = scaleNum;
                var tureXY = new Vector2D();
                tureXY.x = -$rect.x + pageRect.x / materialui.MtlUiData.Scale;
                tureXY.y = -$rect.y + pageRect.y / materialui.MtlUiData.Scale;
                tureXY.x += (pageRect.width / materialui.MtlUiData.Scale - $rect.width) / 2;
                tureXY.y += (pageRect.height / materialui.MtlUiData.Scale - $rect.height) / 2;
                this.stageMoveTx(tureXY);
            }
        };
        MaterialProcessor.prototype.saveMateriaPanel = function () {
            this._materialTree = new materialui.MaterialTree();
            this._materialTree.data = materialui.MaterialCtrl.getInstance().getObj();
            console.log(this.baseMaterialTree);
            if (this.baseMaterialTree.shaderStr) {
                materialui.MaterialModel.getInstance().upMaterialTreeToWeb(this._materialTree, this.getMakeProgemePrame(), this.lastMaterialUrl);
            }
            else {
                alert("选编译才能保存上传");
            }
        };
        MaterialProcessor.prototype.getMakeProgemePrame = function () {
            var obj = {};
            obj.useNormal = this.baseMaterialTree.useNormal;
            obj.hasTime = this.baseMaterialTree.hasTime;
            obj.timeValue = this.baseMaterialTree.timeValue;
            obj.writeZbuffer = this.baseMaterialTree.writeZbuffer;
            obj.zbuff = this.baseMaterialTree.zbuff;
            obj.blendMode = this.baseMaterialTree.blendMode;
            obj.showurl = this.baseMaterialTree.showurl;
            obj.backCull = this.baseMaterialTree.backCull;
            obj.texList = this.baseMaterialTree.texList;
            obj.constList = this.baseMaterialTree.constList;
            obj.shaderStr = this.baseMaterialTree.shaderStr;
            obj.laterTextureurl = this.baseMaterialTree.laterTextureurl;
            obj.fcData = this.baseMaterialTree.fcData.toString();
            obj.paramAry = this.baseMaterialTree.shader.paramAry;
            return obj;
        };
        MaterialProcessor.prototype.selectNodeUi = function ($nodeUi) {
            var $containerList = materialui.MaterialCtrl.getInstance().nodeUiPanel._containerList;
            for (var i = 0; i < $containerList.length; i++) {
                var $temp = $containerList[i];
                if ($temp) {
                    $temp.select = Boolean($nodeUi == $temp);
                }
            }
        };
        MaterialProcessor.prototype.setConnetLine = function ($startItem, $endItem) {
            materialui.MaterialCtrl.getInstance().lineContainer.addConnentLine($startItem, $endItem);
        };
        MaterialProcessor.prototype.removeLine = function ($line) {
            materialui.MaterialCtrl.getInstance().lineContainer.removeLine($line);
        };
        MaterialProcessor.prototype.startDragLine = function ($node) {
            materialui.MaterialCtrl.getInstance().lineContainer.startLine($node);
        };
        MaterialProcessor.prototype.stopDragLine = function ($node) {
            materialui.MaterialCtrl.getInstance().lineContainer.stopLine($node);
        };
        MaterialProcessor.prototype.openMaterialPanel = function () {
        };
        MaterialProcessor.prototype.loadConfigCom = function () {
            this.readMaterialTree();
        };
        MaterialProcessor.prototype.readMaterialTree = function () {
            materialui.MaterialViewBuildUtils.getInstance().addFun = function (ui) { materialui.MaterialCtrl.getInstance().addNodeUI(ui); };
            var id = Number(getUrlParam("id"));
        };
        MaterialProcessor.prototype.onKeyDown = function ($evt) {
            if (!this.hasStage) {
                return;
            }
            AppData.altKey = $evt.altKey;
            switch ($evt.keyCode) {
                case KeyboardType.Delete:
                    var $selectUi = this.getSelUI();
                    if ($selectUi) {
                        if (!($selectUi instanceof materialui.ResultNodeUI)) {
                            this.delUI($selectUi);
                        }
                    }
                    break;
                case KeyboardType.S:
                    if ($evt.altKey) {
                    }
                    break;
                case KeyboardType.C:
                    if ($evt.altKey) {
                    }
                    else {
                        var $selectUi = this.getSelUI();
                        if ($selectUi) {
                            $selectUi.nodeTree.paramName = this.getCanUseParamName();
                            switch ($selectUi.nodeTree.type) {
                                case materialui.NodeTree.TEX:
                                case materialui.NodeTree.TEX3D:
                                case materialui.NodeTree.TEXCUBE:
                                case materialui.NodeTree.VEC3:
                                case materialui.NodeTree.VEC2:
                                case materialui.NodeTree.FLOAT:
                                    if ($selectUi.nodeTree.type) {
                                        $selectUi.nodeTree.isDynamic = !$selectUi.nodeTree.isDynamic;
                                        $selectUi.showDynamic();
                                    }
                                    break;
                                default:
                                    console.log("不可以设置为动态");
                                    break;
                            }
                        }
                    }
                    break;
                case KeyboardType.O:
                    //ModuleEventManager.dispatchEvent(new left.LeftEvent(left.LeftEvent.SHOW_LEFT_PANEL));
                    break;
                case KeyboardType.Z:
                    materialui.MtlUiData.Scale += 0.1;
                    UIManager.getInstance().resize();
                    break;
                default:
                    break;
            }
        };
        MaterialProcessor.prototype.delUI = function ($ui) {
            materialui.MaterialCtrl.getInstance().removeUI($ui);
            $ui.removeAllNodeLine();
            materialui.MaterialCtrl.getInstance().nodeUiPanel.removeUIContainer($ui);
        };
        MaterialProcessor.prototype.getCanUseParamName = function () {
            var tempItem = [];
            var $containerList = materialui.MaterialCtrl.getInstance().nodeUiPanel._containerList;
            for (var i = 0; i < $containerList.length; i++) {
                var $temp = $containerList[i];
                if ($temp && $temp.nodeTree.isDynamic) {
                    tempItem.push($temp.nodeTree.paramName);
                }
            }
            return "param" + tempItem.length;
        };
        MaterialProcessor.prototype.getSelUI = function () {
            var $containerList = materialui.MaterialCtrl.getInstance().nodeUiPanel._containerList;
            for (var i = 0; i < $containerList.length; i++) {
                var $temp = $containerList[i];
                if ($temp && $temp.select) {
                    return $temp;
                }
            }
            return null;
        };
        MaterialProcessor.prototype.onKeyUp = function ($evt) {
            AppData.altKey = $evt.altKey;
        };
        MaterialProcessor.prototype.onMouse = function ($e) {
            if (!this.hasStage) {
                return;
            }
            if ($e.type == MouseType.MouseDown) {
                if ($e.button == 1) {
                    this._isMidelMouse = true;
                    this.mouseXY = new Vector2D($e.x, $e.y);
                }
            }
        };
        MaterialProcessor.prototype.onMouseMove = function ($e) {
            if (!this.hasStage) {
                return;
            }
            if (this._isMidelMouse) {
                var $txy = new Vector2D($e.x - this.mouseXY.x, $e.y - this.mouseXY.y);
                $txy.x /= materialui.MtlUiData.Scale;
                $txy.y /= materialui.MtlUiData.Scale;
                this.stageMoveTx($txy);
                this.mouseXY = new Vector2D($e.x, $e.y);
            }
        };
        MaterialProcessor.prototype.onMouseUp = function ($e) {
            if (!this.hasStage) {
                return;
            }
            this._isMidelMouse = false;
        };
        MaterialProcessor.prototype.onMouseWheel = function ($evt) {
            if (!this.hasStage) {
                return;
            }
            if ($evt.x > AppData.centenPanel.x && $evt.x < AppData.rightPanel.x) {
                var $slectUi = win.LayerManager.getInstance().getObjectsUnderPoint(new Vector2D($evt.x, $evt.y));
                if (!$slectUi || $slectUi.parent instanceof materialui.BaseMaterialNodeUI || $slectUi.parent instanceof materialui.MaterialCavasPanel) {
                    this.changeScalePanle($evt);
                }
            }
        };
        MaterialProcessor.prototype.changeScalePanle = function ($evt) {
            var $v2d = new Vector2D(($evt.x - AppData.stagePos.x), ($evt.y - AppData.stagePos.y));
            var tx = $evt.x / materialui.MtlUiData.Scale;
            var ty = $evt.y / materialui.MtlUiData.Scale;
            var $oldScale = materialui.MtlUiData.Scale;
            var $addScale = $evt.wheelDelta > 0 ? +0.1 : -0.1;
            materialui.MtlUiData.Scale += $addScale;
            materialui.MtlUiData.Scale = Math.max(0.5, materialui.MtlUiData.Scale);
            materialui.MtlUiData.Scale = Math.min(materialui.MtlUiData.Scale, 1.2);
            var $se = (materialui.MtlUiData.Scale - $oldScale);
            this.stageMoveTx(new Vector2D(-tx * $se / materialui.MtlUiData.Scale, -ty * $se / materialui.MtlUiData.Scale));
        };
        MaterialProcessor.prototype.stageMoveTx = function ($txy) {
            AppData.stagePos.x += $txy.x;
            AppData.stagePos.y += $txy.y;
            var $containerList = materialui.MaterialCtrl.getInstance().nodeUiPanel._containerList;
            for (var i = 0; i < $containerList.length; i++) {
                var $uiConatiner = $containerList[i];
                if ($uiConatiner instanceof materialui.BaseMaterialNodeUI) {
                    $uiConatiner.left += $txy.x;
                    $uiConatiner.top += $txy.y;
                    $uiConatiner.uiScale = materialui.MtlUiData.Scale;
                }
            }
            win.LayerManager.getInstance().resize();
        };
        MaterialProcessor.prototype.listenModuleEvents = function () {
            return [
                new MaterialEvent(MaterialEvent.INIT_MATERIA_PANEL),
                new MaterialEvent(MaterialEvent.SHOW_MATERIA_PANEL),
                new MaterialEvent(MaterialEvent.SELECT_MATERIAL_NODE_UI),
                new MaterialEvent(MaterialEvent.SAVE_MATERIA_PANEL),
                new MaterialEvent(MaterialEvent.COMPILE_MATERIAL),
                new MaterialEvent(MaterialEvent.INUPT_NEW_MATERIAL_FILE),
                new materialui.MEvent_Material_Connect(materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_STARTDRAG),
                new materialui.MEvent_Material_Connect(materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_STOPDRAG),
                new materialui.MEvent_Material_Connect(materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_REMOVELINE),
                new materialui.MEvent_Material_Connect(materialui.MEvent_Material_Connect.MEVENT_MATERIAL_CONNECT_DOUBLUELINE),
            ];
        };
        return MaterialProcessor;
    }(BaseProcessor));
    materialui.MaterialProcessor = MaterialProcessor;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialProcessor.js.map