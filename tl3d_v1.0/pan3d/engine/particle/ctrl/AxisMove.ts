module Pan3d {
    export class AxisMove extends BaseAnim {
        public axis: Vector3D;
        public set data(value: Array<any>) {
            this.beginTime = Number(value[0].value);
            if (Number(value[1].value) == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = Number(value[1].value);
            }

            var vc: Array<any> = (value[2].value).split("|");
            this.axis = new Vector3D(Number(vc[0]), Number(vc[1]), Number(vc[2]));
            this.axis.normalize();

            this.speed = Number(value[3].value) * 0.1;
            this.aSpeed = Number(value[4].value) * 0.001;
        }
        public dataByte(va: Array<any>, arr: Array<any>): void {
            this.beginTime = arr[0]
            if (arr[1] == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = arr[1]
            }
            this.axis = arr[2]
            this.axis.normalize();
            this.speed = arr[3] * 0.1;
            this.aSpeed = arr[4] * 0.001;

        }
    }

}