module Pan3d {
    export class AxisRotaion extends BaseAnim {
        public axis: Vector3D;
        public axisPos: Vector3D;

        public set data(value: Array<any>) {
            this.beginTime = Number(value[0].value);
            if (Number(value[1].value) == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = Number(value[1].value);
            }
            var vc: Array<any> = String(value[2].value).split("|");
            this.axis = new Vector3D(Number(vc[0]), Number(vc[1]), Number(vc[2]));

            vc = String(value[3].value).split("|");
            this.axisPos = new Vector3D(Number(vc[0]) * 100, Number(vc[1]) * 100, Number(vc[2]) * 100);

            this.speed = Number(value[4].value) * 0.1;
            this.aSpeed = Number(value[5].value) * 0.1;
        }
        public dataByte(va: Array<any>, arr: Array<any>): void {
            this.beginTime = Number(arr[0]);
            if (Number(arr[1]) == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = Number(arr[1]);
            }
            this.axis = arr[2]
            this.axisPos = arr[3]
            this.speed = arr[4] * 0.1;
            this.aSpeed = arr[5] * 0.1;

        }

    }
}