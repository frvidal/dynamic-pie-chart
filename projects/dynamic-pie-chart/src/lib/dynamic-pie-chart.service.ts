import { Injectable } from '@angular/core';
import { ChartTypeSlice } from './chart-type-slice';
import { TypeSlice } from './type-slice';
import { Slice } from 'dist/dynamic-pie-chart/lib/slice';

@Injectable({
    providedIn: 'root'
})
export class DynamicPieChartService {

    constructor() { }

    /**
     * Filter the types of slice which are present in the slices received.
     *
     * We assumed that this array might contain the WHOLE content of a reference collection.
     * And we assumed that the constituted slices of pie might not involved ALL types of slice
     *
     * @param typeSlice : Available type of slice.
     * @param slices slices sent the component to be drawn.
     */
    public buildChartTypeSlices(typeSlices: TypeSlice[], slices: Slice[]): ChartTypeSlice[] {
        const chartTypeSlices = new Map<number, ChartTypeSlice>();
        let endingAngle = 0;
        slices.forEach(slice => {
            if (chartTypeSlices.has(slice.type)) {
                chartTypeSlices.get(slice.type).endingAngle += slice.angle;
                endingAngle = chartTypeSlices.get(slice.type).endingAngle;
            } else {
                chartTypeSlices.set(slice.type, new ChartTypeSlice(slice.type, '', endingAngle, endingAngle + slice.angle));
                endingAngle += slice.angle;
            }
        });
        return [...chartTypeSlices.values()];
    }

    /**
     * Process the **d** attribute of the SVH element path in order to draw an arc.
     *
     * @param x the x-axis value od the circle center
     * @param y he y-axis value od the circle center
     * @param radius the radius of the the circle where the arc of circle is inscribed
     * @param startAngle the starting angle for the arc
     * @param endAngle the ending angle for the arc
     */
    public describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {

        function polarToCartesian(centerX: number, centerY: number, localRadius: number, angleInDegrees: number) {
            const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

            return {
                x: centerX + (localRadius * Math.cos(angleInRadians)),
                y: centerY + (localRadius * Math.sin(angleInRadians))
            };
        }

        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        const d = [
            'M', start.x, start.y,
            'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(' ');

        return d;
    }
}
