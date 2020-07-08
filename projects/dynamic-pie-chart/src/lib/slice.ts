import { TypeSlice } from './type-slice';

export class Slice {

    constructor(
        public id: number,
        public type: number,
        public angle: number,
        public offset: number,
        public color: string,
        public children: any[],
        public activated = false,
        public selected = false,
        public data?: any) { }

    /**
     * Transform the object into a string.
     */
    toString(): string {
        return this.type + ' ' + this.id + ' ' + this.offset + ' ' + this.angle + ' ' + this.color;
    }
}
