import {Display3dMovie} from "../../../pan3d/engine/display3D/Display3dMovie"
import {LayaOverride2dSceneManager} from "./overridebase/LayaOverride2dSceneManager"
/**
* name 
*/

    import CombineParticle = CombineParticle
    import MeshData = MeshData
    import BindParticle = BindParticle
    import Scene_data = Scene_data
    import ParticleManager = ParticleManager
    import GroupRes = GroupRes
    import GroupItem = GroupItem
    import Vector3D = Vector3D
    import BaseRes = BaseRes
    import Display3DSprite = Display3DSprite
    import ShadowManager = ShadowManager
  
    export class LayaSceneBaseChar extends Display3dMovie {
        private _avatar: number = -1;
   
		public _visible: boolean = true

		public get visible(): boolean {
			return this._visible
		}
		public set visible(value: boolean) {
			this._visible = value
		}

		public setAvatar(num: number): void {

			if (this._avatar == num) {
				return;
			}
			this._avatar = num;
			this.setRoleUrl(this.getSceneCharAvatarUrl(num));


        }
        public set shadow(value: boolean) {
            var $scene: LayaOverride2dSceneManager = <LayaOverride2dSceneManager>this._scene;
            if (value) {
                if (!this._shadow) {
                    this._shadow = $scene.shadowManager.addShadow();
                }
            } else {
                if (this._shadow) {
                    $scene.shadowManager.removeShadow(this._shadow);
                }
            }
        }
		public update(): void {
			if (this.visible) {
				super.update()
			}
			if (this._shadow) {
				this._shadow._visible = this.visible;
			}
		}

		protected getSceneCharAvatarUrl(num: number): string {

			var $url: string = getRoleUrl(String(num))
			return getRoleUrl(String(num));
		}
		protected getSceneCharWeaponUrl(num: number, $suffix: string = ""): string {
			return getModelUrl(String(num + $suffix));
		}

		// 是否播放中
		isPlaying():boolean{
			// if(this._completeState != 1){
			// 	return true;
			// }
			
			return this._completeState != 1 || !this._curentFrame || (this._curentFrame < (this._animDic[this.curentAction].matrixAry.length - 1));
        }

        protected loadPartRes($bindSocket: string, groupRes: GroupRes, ary: Array<any>): void {
            if (this._hasDestory) {
                return;
            }
            for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                var item: GroupItem = groupRes.dataAry[i];

                var posV3d: Vector3D;
                var rotationV3d: Vector3D;
                var scaleV3d: Vector3D;
                if (item.isGroup) {
                    posV3d = new Vector3D(item.x, item.y, item.z);
                    rotationV3d = new Vector3D(item.rotationX, item.rotationY, item.rotationZ);
                    scaleV3d = new Vector3D(item.scaleX, item.scaleY, item.scaleZ);
                }

                if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                    var particle: CombineParticle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + item.particleUrl);
                    ary.push(particle);
                    particle.bindTarget = this;
                    particle.bindSocket = $bindSocket;
                    particle.dynamic = true;
                    (<LayaOverride2dSceneManager>this._scene).particleManager.addParticle(particle);
                    if (item.isGroup) {
                        particle.setGroup(posV3d, rotationV3d, scaleV3d);
                    }
                } else if (item.types == BaseRes.PREFAB_TYPE) {
                    var display: Display3DSprite = new Display3DSprite();
                    display.setObjUrl(item.objUrl);
                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
                    display.dynamic = true;
                    ary.push(display);
                    display.setBind(this, $bindSocket);
                    this._scene.addSpriteDisplay(display);
                    if (item.isGroup) {
                        display.setGroup(posV3d, rotationV3d, scaleV3d);
                    }

                }

            }

            this.applyVisible();

        }

        public removeStage(): void {
            this._onStage = false;
            if (this._shadow) {
                ShadowManager.getInstance().removeShadow(this._shadow);
            }
            for (var key in this._partDic) {
                var ary: Array<any> = this._partDic[key];
                for (var i: number = 0; i < ary.length; i++) {
                    if (ary[i] instanceof CombineParticle) {
                        (<LayaOverride2dSceneManager>this._scene).particleManager.removeParticle(ary[i]);
                    } else if (ary[i] instanceof Display3DSprite) {
                        (<LayaOverride2dSceneManager>this._scene).removeSpriteDisplay(ary[i]);
                    }

                }

            }
        }
        public get px(): number {
            return this.x
        }
        public set px(value: number) {
            this.x = value
        }
        public get py(): number {
            return this.y
        }
        public set py(value: number) {
            this.y = value
        }
        public get pz(): number {
            return this.z
        }
        public set pz(value: number) {
            this.z = value
        }
        public addSkinMeshParticle(): void {
            if (!this._skinMesh) {
                return;
            }
            var dicAry: Array<CombineParticle> = new Array;
            this._partDic["mesh"] = dicAry;

            var meshAry: Array<MeshData> = this._skinMesh.meshAry;
            if (!meshAry) {
                return;
            }
            for (var i: number = 0; i < meshAry.length; i++) {
                var particleAry: Array<BindParticle> = meshAry[i].particleAry;
                for (var j: number = 0; j < particleAry.length; j++) {
                    var bindPartcle: BindParticle = particleAry[j];

                    var particle: CombineParticle;

                    particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + bindPartcle.url);

                    if (!particle.sourceData) {
                        console.log("particle.sourceData error");
                    }

                    particle.dynamic = true;

                    particle.bindSocket = bindPartcle.socketName;

                    dicAry.push(particle);

                    particle.bindTarget = this;

                    particle.scaleX = this.scale;
                    particle.scaleY = this.scale;
                    particle.scaleZ = this.scale;

                    (<LayaOverride2dSceneManager>this._scene).particleManager.addParticle(particle);

                }
            }
        }

        public removeSkinMeshParticle(): void {
            var dicAry: Array<CombineParticle> = this._partDic["mesh"];

            if (!dicAry) {
                return;
            }

            for (var i: number = 0; i < dicAry.length; i++) {
                (<LayaOverride2dSceneManager>this._scene).particleManager.removeParticle(dicAry[i]);
                dicAry[i].destory();
            }

            this._partDic["mesh"] = null;
        }
	}
