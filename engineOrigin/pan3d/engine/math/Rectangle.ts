module Pan3d {
    export class Rectangle {

        x: number = 0;
        y: number = 0;
        width: number = 0;
        height: number = 1;


        constructor($x: number = 0, $y: number = 0, $width: number = 1, $height: number = 1) {
            this.x = $x;
            this.y = $y;
            this.width = $width;
            this.height = $height;
        }

        public sets($x: number, $y, $width: number, $height): void {
            this.x = $x;
            this.y = $y;
            this.width = $width;
            this.height = $height;
        }

        public setRec($rec: Rectangle): void {
            this.x = $rec.x;
            this.y = $rec.y;
            this.width = $rec.width;
            this.height = $rec.height;
        }
        public isHitByPoint(tx: number, ty: number): boolean {
            return (tx >= this.x && ty >= this.y && tx <= this.x + this.width && ty <= this.y + this.height)

        }

    }

}