/**
 * Types of slice for the legend around the pie.
 */
export class ChartTypeSlice {
    constructor(
        public type: number,
        public label: string,
        public startingAngle: number,
        public endingAngle: number) {}
}
