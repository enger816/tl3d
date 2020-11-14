module Pan3d {
    export class Grid9Compenent extends UICompenent {
        public ogw: number;
        public ogh: number;

        public gw: number;
        public gh: number;


        public constructor() {
            super();
        }

        public pushVaData(objData: ObjData, i: number, beginIndex: number): number {
            var vers: Array<number> = [
                0, 0, 0,
                this.ogw, 0, 0,
                this.width - this.ogw, 0, 0,
                this.width, 0, 0,

                0, -this.ogh, 0,
                this.ogw, -this.ogh, 0,
                this.width - this.ogw, -this.ogh, 0,
                this.width, -this.ogh, 0,

                0, this.ogh - this.height, 0,
                this.ogw, this.ogh - this.height, 0,
                this.width - this.ogw, this.ogh - this.height, 0,
                this.width, this.ogh - this.height, 0,

                0, -this.height, 0,
                this.ogw, -this.height, 0,
                this.width - this.ogw, -this.height, 0,
                this.width, -this.height, 0
            ];

            for (var j: number = 0; j < vers.length; j += 3) {
                objData.vertices.push(vers[j] / this.width, vers[j + 1] / this.height, vers[j + 2]);
            }

            //objData.vertices.push(
            //    0, 0, 0,
            //    this.gw, 0, 0,
            //    1 - this.gw, 0, 0,
            //    1, 0, 0,

            //    0, -this.gh, 0,
            //    this.gw, -this.gh, 0,
            //    1 - this.gw, -this.gh, 0,
            //    1, -this.gh, 0,

            //    0, this.gh - 1, 0,
            //    this.gw, this.gh - 1, 0,
            //    1 - this.gw, this.gh - 1, 0,
            //    1, this.gh - 1, 0,

            //    0, -1, 0,
            //    this.gw, -1, 0,
            //    1 - this.gw, -1, 0,
            //    1, -1, 0

            //    );
            objData.uvs.push(
                0, 0, i,
                this.gw, 0, i,
                1 - this.gw, 0, i,
                1, 0, i,

                0, this.gh, i,
                this.gw, this.gh, i,
                1 - this.gw, this.gh, i,
                1, this.gh, i,

                0, 1 - this.gh, i,
                this.gw, 1 - this.gh, i,
                1 - this.gw, 1 - this.gh, i,
                1, 1 - this.gh, i,

                0, 1, i,
                this.gw, 1, i,
                1 - this.gw, 1, i,
                1, 1, i
            );

            var indexary: Array<number> = [
                0, 1, 5, 0, 5, 4,
                1, 2, 6, 1, 6, 5,
                2, 3, 7, 2, 7, 6,
                4, 5, 9, 4, 9, 8,
                5, 6, 10, 5, 10, 9,
                6, 7, 11, 6, 11, 10,
                8, 9, 13, 8, 13, 12,
                9, 10, 14, 9, 14, 13,
                10, 11, 15, 10, 15, 14
            ];

            for (var j: number = 0; j < indexary.length; j++) {
                objData.indexs.push(beginIndex + indexary[j]);
            }

            //objData.indexs.push(beginIndex, 1 + beginIndex, 2 + beginIndex, beginIndex, 2 + beginIndex, 3 + beginIndex);

            return beginIndex + 16;
        }


    }
}