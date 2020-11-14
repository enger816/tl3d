var materialui;
(function (materialui) {
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var Scene_data = Pan3d.Scene_data;
    var LoadManager = Pan3d.LoadManager;
    var Panel = win.Panel;
    var TextureManager = Pan3d.TextureManager;
    var MenuListData = menutwo.MenuListData;
    var MaterialModel = /** @class */ (function () {
        function MaterialModel() {
        }
        MaterialModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new MaterialModel();
            }
            return this._instance;
        };
        MaterialModel.prototype.makePanle = function () {
            materialui.MaterialCtrl.getInstance().bgwinPanel = new Panel(); //背景线
            materialui.MaterialCtrl.getInstance().nodeUiPanel = new Panel(); //模块
            materialui.MaterialCtrl.getInstance().linePanel = new Panel(); //线
            materialui.MaterialCtrl.getInstance().lineContainer = new materialui.MaterialLineContainer(); //创建线层
            materialui.MaterialCtrl.getInstance().linePanel.addUIContainer(materialui.MaterialCtrl.getInstance().lineContainer);
            materialui.MaterialCtrl.getInstance().bgwinPanel.addUIContainer(new materialui.MaterialCavasPanel());
        };
        MaterialModel.prototype.selectMaterialUrl = function (url) {
            pack.PackMaterialManager.getInstance().getMaterialByUrl(url, function ($materialTree) {
                ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.INUPT_NEW_MATERIAL_FILE), $materialTree);
            });
        };
        MaterialModel.prototype.getMenuXml = function () {
            var item = new Array();
            item.push(this.getMathListData());
            item.push(this.getV2CListData());
            item.push(this.getTextureListData());
            item.push(this.getOtherListData());
            return item;
        };
        MaterialModel.prototype.getMathListData = function () {
            var $vo = new MenuListData("Math", "1");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("ADD", "11"));
            $vo.subMenu.push(new MenuListData("SUB", "12"));
            $vo.subMenu.push(new MenuListData("MUL", "13"));
            $vo.subMenu.push(new MenuListData("DIV", "14"));
            $vo.subMenu.push(new MenuListData("SIN", "15"));
            $vo.subMenu.push(new MenuListData("COS", "16"));
            //$vo.subMenu.push(new MenuListData("LERP", "17"));
            //$vo.subMenu.push(new MenuListData("MIN", "18"));
            return $vo;
        };
        MaterialModel.prototype.getV2CListData = function () {
            var $vo = new MenuListData("常数", "2");
            $vo.subMenu = new Array;
            //     $vo.subMenu.push(new MenuListData("vec4", "21"));
            $vo.subMenu.push(new MenuListData("vec3", "22"));
            $vo.subMenu.push(new MenuListData("vec2", "23"));
            $vo.subMenu.push(new MenuListData("float", "24"));
            $vo.subMenu.push(new MenuListData("Time", "25"));
            $vo.subMenu.push(new MenuListData("Normal", "26"));
            return $vo;
        };
        MaterialModel.prototype.getTextureListData = function () {
            var $vo = new MenuListData("纹理", "3");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("纹理贴图", "31"));
            $vo.subMenu.push(new MenuListData("纹理坐标", "32"));
            $vo.subMenu.push(new MenuListData("纹理滚动", "33"));
            $vo.subMenu.push(new MenuListData("Cube纹理", "34"));
            $vo.subMenu.push(new MenuListData("3D贴图", "35"));
            $vo.subMenu.push(new MenuListData("LightUv", "36"));
            return $vo;
        };
        MaterialModel.prototype.getOtherListData = function () {
            var $vo = new MenuListData("其它", "4");
            $vo.subMenu = new Array;
            $vo.subMenu.push(new MenuListData("菲捏尔", "41"));
            $vo.subMenu.push(new MenuListData("導入材質", "42"));
            $vo.subMenu.push(new MenuListData("函数", "43"));
            $vo.subMenu.push(new MenuListData("文件列表", "44"));
            return $vo;
        };
        MaterialModel.prototype.mekeMaterialRightMenu = function ($evt) {
            var _this = this;
            var $rightMenuEvet = new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU);
            var temp = {};
            temp.mouse = new Vector2D($evt.clientX, $evt.clientY);
            temp.menuXmlItem = this.getMenuXml();
            temp.info = {};
            temp.info.bfun = function (value, evt) { _this.menuBfun(value, evt); };
            ModuleEventManager.dispatchEvent(new menutwo.MenuTwoEvent(menutwo.MenuTwoEvent.SHOW_RIGHT_MENU), temp);
        };
        MaterialModel.prototype.menuBfun = function (value, evt) {
            console.log("材质返回菜单", value);
            switch (value.key) {
                case "1":
                    break;
                case "2":
                    break;
                case "3":
                    break;
                case "4":
                    break;
                case "11":
                    this.onTempNode(new materialui.MathAddNodeUI(), evt);
                    break;
                case "12":
                    this.onTempNode(new materialui.MathSubNodeUI(), evt);
                    break;
                case "13":
                    this.onTempNode(new materialui.MathMulNodeUI(), evt);
                    break;
                case "14":
                    this.onTempNode(new materialui.MathDivNodeUI(), evt);
                    break;
                case "15":
                    this.onTempNode(new materialui.MathSinNodeUI(), evt);
                    break;
                case "16":
                    this.onTempNode(new materialui.MathCosNodeUI(), evt);
                    break;
                case "22":
                    this.onTempNode(new materialui.ConstVec3NodeUI(), evt);
                    break;
                case "23":
                    this.onTempNode(new materialui.ConstVec2NodeUI(), evt);
                    break;
                case "24":
                    this.onTempNode(new materialui.ConstFloatNodeUI(), evt);
                    break;
                case "25":
                    this.onTempNode(new materialui.TimeNodeUI(), evt);
                    break;
                case "26":
                    this.onTempNode(new materialui.NormalNodeUI(), evt);
                    break;
                case "31":
                    var textui = new materialui.TextureSampleNodeUI();
                    this.onTempNode(textui, evt);
                    textui.creatBase("assets/white.jpg");
                    break;
                case "32":
                    this.onTempNode(new materialui.TexCoordNodeUI(), evt);
                    break;
                case "36":
                    this.onTempNode(new materialui.TexLightUvNodeUI(), evt);
                    break;
                case "33":
                    this.onTempNode(new materialui.PannerNodeUI(), evt);
                    break;
                case "34":
                    var textCubeui = new materialui.TextureCubeNodeUI();
                    this.onTempNode(textCubeui, evt);
                    textCubeui.creatBase("assets/white.jpg");
                    break;
                case "35":
                    var text3dui = new materialui.Texture3DNodeUI();
                    this.onTempNode(text3dui, evt);
                    text3dui.creatBase("assets/white.jpg");
                    break;
                case "41":
                    this.onTempNode(new materialui.FresnelNodeUI(), evt);
                    break;
                case "42":
                    //this.selectInputDae(evt)
                    // filemodel.InputMaterialModel.getInstance().inputFile(evt)
                    break;
                case "43":
                    this.onTempNode(new materialui.MathFunNodeUI(), evt);
                    break;
                case "44":
                    Pan3d.ModuleEventManager.dispatchEvent(new folder.FolderEvent(folder.FolderEvent.SHOW_FOLDER_PANEL));
                    break;
                default:
                    break;
            }
        };
        MaterialModel.prototype.onTempNode = function ($ui, evt) {
            $ui.left = evt.x / materialui.MtlUiData.Scale - 150;
            $ui.top = evt.y / materialui.MtlUiData.Scale - 30;
            $ui.uiScale = materialui.MtlUiData.Scale;
            materialui.MaterialCtrl.getInstance().addNodeUI($ui);
            win.LayerManager.getInstance().resize();
        };
        MaterialModel.prototype.dataURLtoFile = function (dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        };
        MaterialModel.prototype.MakeTempWebMaterialTree = function ($temp, $info) {
            var $byte = new Pan3d.Pan3dByteArray();
            $byte.writeUTF(JSON.stringify({ data: $temp.data, info: $info }));
            pack.PackMaterialManager.getInstance().getMaterialByUrl($temp.url, function (value) {
                pack.PackMaterialManager.getInstance().makeMaterialShaderByByte($byte, $temp.url, value);
            });
        };
        MaterialModel.prototype.upMaterialTreeToWeb = function ($temp, $info, $url) {
            for (var i = 0; $temp.data && i < $temp.data.length; i++) {
                var $vo = $temp.data[i];
                if ($vo.type == materialui.NodeTree.TEX || $vo.type == materialui.NodeTree.TEX3D || $vo.type == materialui.NodeTree.TEXCUBE) {
                    var $img = TextureManager.getInstance().getImgResByurl(Scene_data.fileRoot + $vo.data.url);
                    if ($img) { //新加的图
                        console.log("图片列表", $img);
                        /*
                        var $upfile: File = this.dataURLtoFile($img.src, $vo.data.url);
                        var $newUrl: string = "ccc.jpg"
                        filemodel.FolderModel.upOssFile($upfile, "shadertree/" + $newUrl, () => {
                            console.log("文件上传成功");
                        })
                        $vo.data.url = $newUrl;
                        */
                    }
                    else {
                    }
                }
            }
            var $byte = new Pan3d.Pan3dByteArray();
            $byte.writeUTF(JSON.stringify({ data: $temp.data, info: $info }));
            var $file = new File([$byte.buffer], "ossfile.txt");
            var pathUrl = Pan3d.Scene_data.fileRoot + $url;
            var pathurl = pathUrl.replace(Pan3d.Scene_data.ossRoot, "");
            console.log(pathUrl);
            pack.FileOssModel.upOssFile($file, pathurl, function () {
                console.log("材质上传成功");
                pack.PackMaterialManager.getInstance().replaceMaterialByUrl($url);
            });
        };
        MaterialModel.prototype.selectFileById = function (value) {
            var $texturl = "texturelist/" + value + ".txt";
            LoadManager.getInstance().load(Scene_data.fileRoot + $texturl, LoadManager.BYTE_TYPE, function ($dtstr) {
                var $byte = new Pan3d.Pan3dByteArray($dtstr);
                $byte.position = 0;
                var $temp = JSON.parse($byte.readUTF());
                var $tempMaterial = new materialui.MaterialTree;
                $tempMaterial = new materialui.MaterialTree;
                $tempMaterial.url = $texturl;
                $tempMaterial.setData({ data: $temp.data });
                ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.INUPT_NEW_MATERIAL_FILE), $tempMaterial);
                /*
                    LoadManager.getInstance().load(Scene_data.fileRoot + "texturelist/config/" + this.fileid + ".txt", LoadManager.XML_TYPE,
                        ($configStr: string) => {
                            var $config: any = JSON.parse($configStr);
                            if ($config.showType == 0) {
                                LoadManager.getInstance().load(Scene_data.fileRoot + "texturelist/model_" + value + "_objs.txt", LoadManager.XML_TYPE,
                                    ($modelxml: string) => {
                                        left.ModelShowModel.getInstance().readTxtToModelBy($modelxml)
                                        ModuleEventManager.dispatchEvent(new materialui.MaterialEvent(materialui.MaterialEvent.COMPILE_MATERIAL));
                                    });
                            }
                            if ($config.showType == 1) {
                                filemodel.RoleChangeModel.getInstance().changeRoleModel(this.fileid)
                                Scene_data.cam3D.distance = 100
                                left.SceneRenderToTextrue.getInstance().viweLHnumber = 300
                            }
                        });
                 
                    */
            });
        };
        return MaterialModel;
    }());
    materialui.MaterialModel = MaterialModel;
})(materialui || (materialui = {}));
//# sourceMappingURL=MaterialModel.js.map