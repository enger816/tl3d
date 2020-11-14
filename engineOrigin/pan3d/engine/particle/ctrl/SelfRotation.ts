module Pan3d {
    export class SelfRotation extends BaseAnim {

        public set data(value: Array<any>) {
            this.beginTime = Number(value[0].value);
            if (Number(value[1].value) == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = Number(value[1].value);
            }
            this.speed = Number(value[2].value) * 0.1;
            this.aSpeed = Number(value[3].value) * 0.1;
        }
        public dataByte(va: Array<any>, arr: Array<any>): void {
            this.beginTime = arr[0]
            if (arr[1] == -1) {
                this.lastTime = Scene_data.MAX_NUMBER;
            } else {
                this.lastTime = arr[1];
            }
            this.speed = arr[2] * 0.1;
            this.aSpeed = arr[3] * 0.1;

        }

    }
}