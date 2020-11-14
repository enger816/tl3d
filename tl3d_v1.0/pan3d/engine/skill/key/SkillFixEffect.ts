module Pan3d {
    export class SkillBugBind implements IBind {
        public bindMatrix: Matrix3D;
        public getSocket(socketName: string, resultMatrix: Matrix3D): void {
            this.bindMatrix.clone(resultMatrix);
        }
        public getSunType(): number {
            return 1
        }
    }
    export class SkillFixEffect extends SkillEffect {
        public pos: Vector3D;
        public rotation: Vector3D;
        public outPos: Vector3D;
        public hasSocket: boolean;
        public socket: string;

        public setInfo(obj: SkillKeyVo): void {
            super.setInfo(obj);
            var data: SkillFixEffectKeyVo = <SkillFixEffectKeyVo>obj;
            this.pos = data.pos;
            this.rotation = data.rotation;
            this.hasSocket = data.hasSocket;
            this.socket = data.socket;

        }
        public addToRender(): void {
            super.addToRender();


            if (this.outPos) {
                this.particle.x = this.outPos.x;
                this.particle.y = this.outPos.y;
                this.particle.z = this.outPos.z;

                this.particle.rotationX = this.rotation.x;
                this.particle.rotationY = this.rotation.y + this.active.rotationY;
                this.particle.rotationZ = this.rotation.z;

                this.particle.bindTarget = null;
            } else if (this.hasSocket) {
                var targetActive: any = this.active;
                this.particle.bindTarget = <IBind>(targetActive);
                this.particle.bindSocket = this.socket;
            } else {
                var ma: Matrix3D = new Matrix3D;
                ma.appendRotation(this.active.rotationY, Vector3D.Y_AXIS);
                var v3d: Vector3D = ma.transformVector(this.pos);
                v3d.x += this.active.x;
                v3d.y += this.active.y;
                v3d.z += this.active.z;


                /* //原来小刘写的方法，在有编辑器中因为角色角度为0,当游戏场景时就会有错。
                this.particle.x = v3d.x;
                this.particle.y = v3d.y;
                this.particle.z = v3d.z;

                this.particle.rotationX = this.rotation.x;
                this.particle.rotationY = this.rotation.y +this.active.rotationY
                this.particle.rotationZ = this.rotation.z;

                */

               // 当绑定对象有三个轴变化时有异常，需

                var $SkillBugBind: SkillBugBind = new SkillBugBind();
                $SkillBugBind.bindMatrix = new Matrix3D
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.x, Vector3D.X_AXIS)
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.y, Vector3D.Y_AXIS)
                $SkillBugBind.bindMatrix.appendRotation(this.rotation.z, Vector3D.Z_AXIS)
                $SkillBugBind.bindMatrix.appendRotation(this.active.rotationY, Vector3D.Y_AXIS)
                $SkillBugBind.bindMatrix.appendTranslation(v3d.x, v3d.y, v3d.z)
                this.particle.bindTarget = $SkillBugBind;


            }






        }
    }
}