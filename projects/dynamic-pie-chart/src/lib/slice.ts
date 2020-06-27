import { TypeSlice } from './type-slice';

export class Slice {

    constructor(
        public id: number,
        public type: number,
        public angle: number,
        public offset: number,
        public color: string,
        public contents: object[],
        public activated = false,
        public selected = false) { }

    /**
     * Transform the object into a string.
     */
    toString() {
        console.log (this.type + ' ' + this.id + ' ' + this.offset + ' ' + this.angle + ' ' + this.color);
    }
}
