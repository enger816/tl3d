var online;
(function (online) {
    var Vector3D = Pan3d.Vector3D;
    var Display3D = Pan3d.Display3D;
    var GameDataModel = game.GameDataModel;
    var OnlineUserAiModel = /** @class */ (function () {
        function OnlineUserAiModel() {
        }
        OnlineUserAiModel.getInstance = function () {
            if (!OnlineUserAiModel._instance) {
                OnlineUserAiModel._instance = new OnlineUserAiModel();
            }
            return OnlineUserAiModel._instance;
        };
        OnlineUserAiModel.prototype.addUsers = function () {
            this._scene = GameDataModel.scene;
            for (var i = 0; i < online.OnlineManager.getInstance().onleuserlist.length; i++) {
                var $onlineUserVo = online.OnlineManager.getInstance().onleuserlist[i];
                if ($onlineUserVo.openid != GameData.getStorageSync("openid")) {
                    var dis = online.OnlineCanonPrefabSprite.addMoveOhterUser(12, this._scene);
                    dis.onlineUserVo = $onlineUserVo;
                    var $v3d = this.getBasePos();
                    dis.x = $v3d.x;
                    dis.z = $v3d.z;
                    dis.y = 10;
                    dis.resetParticlePos();
                    dis.bodyfouce = new Vector3D(0, -1000, 0);
                    this._userItem.push(dis);
                }
            }
            for (var j = 0; j < 10; j++) {
                this.addTempDiamonds();
            }
        };
        OnlineUserAiModel.prototype.getBasePos = function () {
            var $arr = new Array;
            $arr.push(new Vector3D(70, 12, -23));
            $arr.push(new Vector3D(168, 12, 5));
            $arr.push(new Vector3D(185, 12, 104));
            $arr.push(new Vector3D(119, 12, 177));
            $arr.push(new Vector3D(35, 12, 143));
            $arr.push(new Vector3D(-55, 12, 102));
            $arr.push(new Vector3D(-161, 12, 82));
            $arr.push(new Vector3D(-161, 12, 117));
            $arr.push(new Vector3D(-25, 12, 104));
            $arr.push(new Vector3D(25, 12, 49));
            $arr.push(new Vector3D(70, 12, -18));
            $arr.push(new Vector3D(132, 12, -74));
            $arr.push(new Vector3D(147, 12, -64));
            $arr.push(new Vector3D(160, 12, -106));
            $arr.push(new Vector3D(138, 12, -179));
            $arr.push(new Vector3D(83, 12, -182));
            $arr.push(new Vector3D(4, 12, -129));
            return $arr[random($arr.length)];
        };
        OnlineUserAiModel.prototype.clearDiamodsAll = function () {
            while (this.modelDiamods && this.modelDiamods.length) {
                var $dis = this.modelDiamods.pop();
                game.GameDataModel.scene.removeDisplay($dis);
                $dis.destory();
            }
            this.modelDiamods = new Array;
        };
        OnlineUserAiModel.prototype.clearOnlineUser = function () {
            while (this._userItem && this._userItem.length) {
                var $dis = this._userItem.pop();
                $dis.destory();
            }
            this._userItem = new Array;
        };
        OnlineUserAiModel.prototype.addTempDiamonds = function () {
            var $dis = new online.OnlineDiamondsDisplay3DSprite();
            $dis.name = "dde";
            var $v3d = this.getBasePos();
            $dis.x = $v3d.x;
            $dis.y = 5;
            $dis.z = $v3d.z;
            $dis.setModelById("zhuanshi");
            $dis._scene = game.GameDataModel.scene;
            game.GameDataModel.scene.addDisplay($dis);
            this.modelDiamods.push($dis);
            return $dis;
        };
        OnlineUserAiModel.prototype.upFrame = function () {
            if (canonkey.Physics.ready) {
                if (this.testHitDiamd(GameDataModel.centenBall)) {
                    game.GameSoundManager.getInstance().playSoundByName("getdiamond");
                }
                if (online.OnlineManager.getInstance().isAotuPaly) {
                    this.playSelfAiBySprite(GameDataModel.centenBall);
                }
                for (var i = 0; i < this._userItem.length; i++) {
                    this.testHitDiamd(this._userItem[i]);
                    this.playAiBySprite(this._userItem[i]);
                }
            }
        };
        OnlineUserAiModel.prototype.playSelfAiBySprite = function ($dis) {
            if ($dis.nextDiamonds && $dis.nextDiamonds.sceneVisible) {
                var $v3dA = new Vector3D($dis.x, 0, $dis.z);
                var $v3dB = new Vector3D($dis.nextDiamonds.x, 0, $dis.nextDiamonds.z);
                var $dic = Vector3D.distance($v3dB, $v3dA);
                var $nmrv3d = $v3dB.subtract($v3dA);
                $nmrv3d.normalize();
                $nmrv3d.scaleBy($dic);
                $dis.bodyfouce = $nmrv3d;
            }
            else {
                $dis.nextDiamonds = this.findNextPos(new Vector3D($dis.x, $dis.y, $dis.z));
            }
        };
        OnlineUserAiModel.prototype.testHitDiamd = function ($dis) {
            var isHit;
            for (var i = 0; i < this.modelDiamods.length; i++) {
                if (this.modelDiamods[i].sceneVisible) {
                    var $distens = Display3D.distance($dis, this.modelDiamods[i]);
                    if ($distens < 15) {
                        this.removeDiamods(this.modelDiamods[i]);
                        this.addTempDiamonds();
                        $dis.playHitDiamonds();
                        isHit = true;
                        return isHit;
                    }
                }
            }
            return isHit;
        };
        OnlineUserAiModel.prototype.removeDiamods = function ($dis) {
            $dis.sceneVisible = false;
            $dis.showFinishEfict();
            var index = this.modelDiamods.indexOf($dis);
            if (index != -1) {
                this.modelDiamods.splice(index, 1);
            }
            game.GameDataModel.scene.removeDisplay($dis);
            $dis.destory();
        };
        OnlineUserAiModel.prototype.playAiBySprite = function ($dis) {
            if ($dis.nextDiamonds && $dis.nextDiamonds.sceneVisible) {
                var $v3dA = new Vector3D($dis.x, 0, $dis.z);
                var $v3dB = new Vector3D($dis.nextDiamonds.x, 0, $dis.nextDiamonds.z);
                var $dic = Vector3D.distance($v3dB, $v3dA);
                var $nmrv3d = $v3dB.subtract($v3dA);
                $nmrv3d.normalize();
                $nmrv3d.scaleBy($dic);
                $dis.bodyfouce = $nmrv3d;
            }
            else {
                $dis.nextDiamonds = this.findNextPos(new Vector3D($dis.x, $dis.y, $dis.z));
            }
        };
        OnlineUserAiModel.prototype.findNextPos = function ($v3d) {
            var $num;
            var $select;
            for (var i = 0; i < this.modelDiamods.length; i++) {
                if (this.modelDiamods[i].sceneVisible) {
                    var $v3dB = new Vector3D(this.modelDiamods[i].x, this.modelDiamods[i].y, this.modelDiamods[i].z);
                    var $distens = Vector3D.distance($v3dB, $v3d);
                    if (isNaN($num) || $num > $distens) {
                        $select = this.modelDiamods[i];
                    }
                }
            }
            return this.modelDiamods[random(this.modelDiamods.length)];
        };
        return OnlineUserAiModel;
    }());
    online.OnlineUserAiModel = OnlineUserAiModel;
})(online || (online = {}));
//# sourceMappingURL=OnlineUserAiModel.js.map