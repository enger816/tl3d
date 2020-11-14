module Pan3d {
    export class DynamicConstItem extends DynamicBaseConstItem {

        public curve: Curve;


        public update(t: number = 0): void {
            this.currentValue = this.curve.getValue(t);
            this.target.setDynamic(this);
            //this.target.setDynamicDirect(this.curve.getValue(t),this.targetOffset);
        }


        public set type(value: number) {
            this._type = value;
            this.curve = new Curve;
            this.curve.type = value;
        }



    }
}