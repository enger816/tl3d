var left;
(function (left) {
    var Scene_data = Pan3d.Scene_data;
    var TimeUtil = Pan3d.TimeUtil;
    var MaterialShader = Pan3d.MaterialShader;
    var ModelShowModel = /** @class */ (function () {
        function ModelShowModel() {
        }
        ModelShowModel.getInstance = function () {
            if (!this._instance) {
                this._instance = new ModelShowModel();
            }
            return this._instance;
        };
        ModelShowModel.prototype.addBaseModel = function () {
            var _this = this;
            Scene_data.cam3D.distance = 150;
            this.modelSprite = new left.MaterialModelSprite();
            this.roleSprite = new left.MaterialRoleSprite();
            this.selectShowDisp = this.modelSprite;
            TimeUtil.addFrameTick(function (t) { _this.update(t); });
            this.makeMd5MoveSprite();
        };
        ModelShowModel.prototype.changeWebModel = function () {
            this.roleSprite.changeRoleWeb(this.webmd5Sprite);
        };
        ModelShowModel.prototype.makeMd5MoveSprite = function () {
            this.webmd5Sprite = new left.LocalMd5MoveSprite();
            this.webmd5Sprite.setMd5url("2/body.md5mesh", "2/stand.md5anim", "white.jpg");
        };
        ModelShowModel.prototype.update = function (t) {
            if (this._bigPic && this._bigPic.textureRes) {
                if (this.selectShowDisp instanceof left.MaterialRoleSprite) {
                    this.selectShowDisp.updateFrame(t);
                    Scene_data.focus3D.y = 20;
                }
                else {
                    Scene_data.focus3D.y = 0;
                }
                left.SceneRenderToTextrue.getInstance().renderToTexture([this.selectShowDisp, this.webmd5Sprite]);
                if (left.SceneRenderToTextrue.getInstance().fbo) {
                    this._bigPic.textureRes.texture = left.SceneRenderToTextrue.getInstance().fbo.texture;
                }
            }
        };
        ModelShowModel.prototype.readTxtToModelBy = function (value) {
            this.modelSprite.readTxtToModel(value);
            var maxVec = new Vector3D();
            for (var i = 0; i < this.modelSprite.objData.vertices.length / 3; i++) {
                maxVec.x = Math.max(maxVec.x, Math.abs(this.modelSprite.objData.vertices[i * 3 + 0]));
                maxVec.y = Math.max(maxVec.y, Math.abs(this.modelSprite.objData.vertices[i * 3 + 1]));
                maxVec.z = Math.max(maxVec.z, Math.abs(this.modelSprite.objData.vertices[i * 3 + 2]));
            }
            left.SceneRenderToTextrue.getInstance().viweLHnumber = Math.max(maxVec.x, maxVec.y, maxVec.z) * 4;
            Scene_data.cam3D.distance = Math.max(maxVec.x, maxVec.y, maxVec.z) * 2;
            this.selectShowDisp = this.modelSprite;
        };
        ModelShowModel.prototype.changeRoleUrl = function (value) {
            var $role = new left.MaterialRoleSprite();
            $role.setRoleUrl(value);
            this.selectShowDisp = $role;
        };
        ModelShowModel.prototype.makeRoleShader = function ($treeMater) {
            var $roleShader = new left.RoleMaterialShader();
            $roleShader.buildParamAry($treeMater);
            $roleShader.vertex = $roleShader.getVertexShaderString();
            $roleShader.fragment = $treeMater.shaderStr;
            $roleShader.encode();
            console.log("----------vertex------------");
            console.log($roleShader.vertex);
            console.log("----------fragment------------");
            console.log($roleShader.fragment);
            console.log("----------roleShader------------");
            var $temp = $treeMater.clone();
            $temp.roleShader = $roleShader;
            this.selectShowDisp.material = $temp;
        };
        ModelShowModel.prototype.makeBuldShader = function ($treeMater) {
            var $buildShader = new left.BuildMaterialShader();
            $buildShader.buildParamAry($treeMater);
            $treeMater.shader.paramAry = $buildShader.paramAry;
            $buildShader.vertex = $buildShader.getVertexShaderString();
            $buildShader.fragment = $treeMater.shaderStr;
            $buildShader.encode();
            var $temp = $treeMater.clone();
            $temp.modelShader = $buildShader;
            console.log("----------vertex------------");
            console.log($buildShader.vertex);
            console.log("----------fragment------------");
            console.log($buildShader.fragment);
            console.log("----------buildShader------------");
            //将本来材质对象设置为新的效果
            this.selectShowDisp.material = $temp;
        };
        ModelShowModel.prototype.outShaderStr = function ($treeMater) {
            if (this.selectShowDisp instanceof left.MaterialModelSprite) {
                this.makeBuldShader($treeMater);
            }
            if (this.selectShowDisp instanceof left.MaterialRoleSprite) {
                this.makeRoleShader($treeMater);
            }
        };
        ModelShowModel.prototype.getMaterialProgram = function (key, shaderCls, $material, paramAry, parmaByFragmet) {
            if (paramAry === void 0) { paramAry = null; }
            if (parmaByFragmet === void 0) { parmaByFragmet = false; }
            var keyStr = key + "_" + $material.url;
            if (paramAry) {
                for (var i = 0; i < paramAry.length; i++) {
                    keyStr += "_" + paramAry[i];
                }
                if (parmaByFragmet) {
                    keyStr += "true_";
                }
                else {
                    keyStr += "false_";
                }
            }
            if (parmaByFragmet) {
                paramAry = [$material.usePbr, $material.useNormal, $material.hasFresnel,
                    $material.useDynamicIBL, $material.lightProbe, $material.directLight,
                    $material.noLight, $material.fogMode];
            }
            var shader = new MaterialShader();
            shader.paramAry = paramAry;
            shader.fragment = $material.shaderStr;
            var encodetf = shader.encode();
            shader.useNum++;
            return shader;
        };
        return ModelShowModel;
    }());
    left.ModelShowModel = ModelShowModel;
})(left || (left = {}));
//# sourceMappingURL=ModelShowModel.js.map