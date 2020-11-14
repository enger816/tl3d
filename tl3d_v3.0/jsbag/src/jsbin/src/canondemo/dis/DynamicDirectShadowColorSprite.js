var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var cannondis;
(function (cannondis) {
    var Vector3D = Pan3d.Vector3D;
    var Matrix3D = Pan3d.Matrix3D;
    var Scene_data = Pan3d.Scene_data;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var DynamicDirectShadowColorSprite = /** @class */ (function (_super) {
        __extends(DynamicDirectShadowColorSprite, _super);
        function DynamicDirectShadowColorSprite() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DynamicDirectShadowColorSprite.prototype.initData = function () {
            _super.prototype.initData.call(this);
            ProgrmaManager.getInstance().registe(cannondis.MainNoShadowShader.MainNoShadowShader, new cannondis.MainNoShadowShader);
            this.dynamicShader = ProgrmaManager.getInstance().getProgram(cannondis.MainNoShadowShader.MainNoShadowShader);
        };
        DynamicDirectShadowColorSprite.prototype.drawTemp = function ($dis) {
            var $objdata = $dis.objData;
            var $shader = this.dynamicShader;
            if ($objdata && $objdata.indexBuffer && this._uvTextureRes) {
                Scene_data.context3D.setProgram($shader.program);
                var $numr = new Vector3D(0.5, 0.6, -0.7);
                $numr.normalize();
                var mGamA = new Matrix3D;
                mGamA.appendRotation(-game.GameDataModel.gameAngle, Vector3D.Y_AXIS);
                $numr = mGamA.transformVector($numr);
                Scene_data.context3D.setVc3fv($shader, "sunDirect", [$numr.x, $numr.y, $numr.z]);
                Scene_data.context3D.setVc3fv($shader, "sunColor", [0.6, 0.6, 0.6]);
                Scene_data.context3D.setVc3fv($shader, "ambientColor", [0.4, 0.4, 0.4]);
                Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
                Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
                Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);
                Scene_data.context3D.setRenderTexture($shader, "fs0", this._uvTextureRes.texture, 0);
                Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);
                Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
                Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
                Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);
                Scene_data.context3D.drawCall($objdata.indexBuffer, $objdata.treNum);
            }
        };
        return DynamicDirectShadowColorSprite;
    }(cannondis.DirectShadowColorSprite));
    cannondis.DynamicDirectShadowColorSprite = DynamicDirectShadowColorSprite;
})(cannondis || (cannondis = {}));
//# sourceMappingURL=DynamicDirectShadowColorSprite.js.map