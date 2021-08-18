import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import * as D3 from 'd3';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BaseDirective } from './base.component';
import { ChartTypeSlice } from './chart-type-slice';
import { DynamicPieChartService } from './dynamic-pie-chart.service';
import { Slice } from './slice';
import { TypeSlice } from './type-slice';

@Component({
    selector: 'lib-dynamic-pie-chart',
    templateUrl: './dynamic-pie-chart.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    styleUrls: ['./dynamic-pie-chart.component.css']
})
export class DynamicPieChartComponent extends BaseDirective implements OnInit, OnDestroy, AfterViewInit {

    /**
     * Undocumented parameter to launch this component in 'DEBUG' mode.
     */
    @Input() debug = false;

    /**
     * Observable passing an array of Slices to the pie.
     */
    @Input() slices$ = new BehaviorSubject<Slice[]>([]);

    /**
     * filteredIds$ : This behaviorSubject broadcasts an array of slice identifiers which should be drawn.
     *
     * The goal of this array is to limit the renderer to some sections only. we aim a partial draw.
     *
     * _If this behaviorSubject emits an empty array, then the complete pie should be drawn._
     */
    @Input() filteredIds$ = new BehaviorSubject<number[]>([]);

    /**
     * Observable passing an array of Types of slices used for the legend.
     */
    @Input() typeSlices$ = new BehaviorSubject<TypeSlice[]>([]);

    /**
     * Radius of the Pie.
     */
    @Input() radius: number;

    /**
     * Pie number : There might be multiple pies displayed on the dashboard. This number is identifying each one.
     */
    @Input() pie: number;

    /**
     * active : One pie might be active for the mouse events.
     *
     * __There can only be one active on the same dashboard.__
     */
    @Input() active: boolean;

    /**
     * legend : Do we add a legend around the slices of the Pie.
     *
     * _If this boolean is set to *TRUE*, the legend will be drawn around the Pie._
     */
    @Input() legend = false;

    /**
     * Emit the slice **Activated**
     */
    @Output() activated = new EventEmitter<Slice>();

    /**
     * Emit the slice **Selected**
     */
    @Output() selected = new EventEmitter<Slice>();

    /**
     * D3 Arc generator.
     */
    arcGenerator: D3.Arc<any, D3.DefaultArcObject>;

    /**
     * Array of Arc identifiers.
     */
    private arcs = [];

    /**
     * Array of Text identifiers.
     */
    private texts = [];

    /**
     * Angle minimum required to display the label.
     */
    private ANGLE_MINIMUM_FOR_LABEL = 15;

    /**
     * Array of types of slice used to display the legend associated with each type of slice.
     *
     * This array might contain the complete list
     */
    public wholeTypeSlices: TypeSlice[];

    /**
     * Array of slice identifiers filtered to be drawn.
     *
     * If this array is empty, system will consider that no filter has been set. The whole chart will be drawn.
     */
    public filteredIds: number[] = [];

    /**
     * Observable emitting an array of types of slice used to display the legend associated with each type of slice.
     */
    public chartTypeSlices$ = new BehaviorSubject<ChartTypeSlice[]>([]);

    constructor(public dynamicPieChartService: DynamicPieChartService) {
        super();
    }

    ngOnInit() {
    }

    ngAfterViewInit() {

        /**
         * Compare 2 slices in order to sort them on their type.
         * @param s1 the slide ONE to compare
         * @param s2  the slice TWO to compare
         */
        function compare(s1: Slice, s2: Slice) {
            return (s1.type - s2.type);
        }

        /**
         * Processing the offset for the given slices
         * @param slices the slices of the pie
         */
        function calculateOffset(slices: Slice[]) {
            let offset = 0;
            // We reinitialize the slices offsets.
            slices.forEach(slice => slice.offset = 0);
            slices.sort((s1: Slice, s2: Slice) => compare(s1, s2))
                .forEach(slice => {
                    slice.offset = offset;
                    offset += slice.angle;
                });
        }

        this.arcGenerator = D3.arc().cornerRadius(4).padAngle(.01).padRadius(100);
        this.subscriptions.add(
            this.typeSlices$.pipe(
                switchMap(typeSlices => {
                    this.wholeTypeSlices = typeSlices;
                    return this.filteredIds$;
                })
            ).pipe(
                switchMap(filteredIds => {
                    this.cleanupFilteredSlices(this.filteredIds);
                    this.filteredIds = filteredIds;
                    if (this.debug) {
                        console.groupCollapsed('Slices to be filtered for pie %d', this.pie);
                        this.filteredIds.forEach(id => console.log ('id', id));
                        console.groupEnd();
                    }
                    return this.slices$;
                })
            ).subscribe(slices => {
                if (this.debug) {
                    console.groupCollapsed('slices received for pie %d', this.pie);
                    slices.forEach(slice => console.log(slice.type + ' ' + slice.id + ' ' + slice.offset + ' ' + slice.angle));
                    console.groupEnd();
                }
                setTimeout(() => {
                    calculateOffset(slices);
                    const chartTypeSlices = this.dynamicPieChartService.buildChartTypeSlices(this.wholeTypeSlices, slices);
                    if (this.debug) {
                        console.groupCollapsed('List of type of slices corresponding to the given slices');
                        chartTypeSlices.forEach(element => {
                            console.log(element.type, element.label + ' from ' + element.startingAngle + ' to ' + element.endingAngle);
                        });
                        console.groupEnd();
                    }
                    this.loadArcsArray(chartTypeSlices);
                    this.loadTextsArray(chartTypeSlices);
                    this.chartTypeSlices$.next(chartTypeSlices);
                    this.generatePie(...slices);
                }, 0);
            }));
    }

    /**
     * This function generates the Chart pie.
     *
     * @param slices the given slices with its parameters *(such as angle, color...)*
     */
    private generatePie(...slices: Slice[]) {
        if (this.debug) {
            console.groupCollapsed('slices ordered for pie %d', this.pie);
            slices.forEach(slice => console.log(slice.type + ' ' + slice.id + ' ' + slice.offset + ' ' + slice.angle));
            console.groupEnd();
        }
        slices.forEach(slice => {
            // Either we generate and draw the whole pie, or we just draw the slices whose ids are declared in the filteredIds array
            if ((this.filteredIds.length === 0) || (this.filteredIds.indexOf(slice.id) >= 0)) {
                this.generatePieSlice(slice);
            }
        });
    }

    /**
     * Load the array containing the arc identifiers.
     * @param chartTypeSlices the type of slices present in the array
     */
    loadArcsArray(chartTypeSlices: ChartTypeSlice[]) {
        this.arcs = [...chartTypeSlices.map(chartTypeSlice => '#arc-' + this.pie + '-' + chartTypeSlice.type)];
    }

    /**
     * Load the array containing the text identifiers.
     * @param chartTypeSlices the type of slices present in the array
     */
    loadTextsArray(chartTypeSlices: ChartTypeSlice[]) {
        this.texts = [...chartTypeSlices.map(chartTypeSlice => '#text-' + this.pie + '-' + chartTypeSlice.type)];
    }


    /**
     * We cleanup the previous slices drawn by the former given filtered slices.
     * @param filteredIds array of the former slice identifier drawn.
     */
    cleanupFilteredSlices(filteredIds: number[]) {
        filteredIds.forEach(id => {
            D3.select(this.svgPieSliceID(id)).selectAll('*').remove();
        });
    }

    /**
     * This function generates the SVG arc figuring a slice.
     * @param slice the given slice with its parameters *(such as angle, color...)*
     */
    private generatePieSlice(slice: Slice): void {

        const idPathText = () => 'text-' + this.pie + '-' + slice.id;

        const pathSlice = this.arcGenerator({
            startAngle: (slice.offset * 2 * Math.PI) / 360,
            endAngle: ((slice.offset + slice.angle) * 2 * Math.PI) / 360,
            innerRadius: 5,
            outerRadius: this.radius
        });

        D3.select(this.svgPieSliceID(slice.id))
            .append('path')
            .attr('transform', 'translate(200,200)')
            .attr('fill', slice.backgroundColor)
            .attr('d', pathSlice);

        if (this.active) {

            if (slice.angle > this.ANGLE_MINIMUM_FOR_LABEL) {

                const pathText = this.arcGenerator({
                    startAngle: (slice.offset * 2 * Math.PI) / 360,
                    endAngle: ((slice.offset + slice.angle) * 2 * Math.PI) / 360,
                    innerRadius: 2 * this.radius / 3,
                    outerRadius: 2 * this.radius / 3
                });

                D3.select(this.svgPieSliceID(slice.id))
                    .append('path')
                    .attr('id', idPathText())
                    .attr('d', pathText);

                D3.select(this.svgPieSliceID(slice.id))
                    .append('text')
                    .attr('transform', 'translate(200,200)')
                    .attr('fill', slice.textColor)
                    .attr('font-size', slice.textFontSize)
                    .append('textPath')
                    .attr('xlink:href', '#' + idPathText())
                    .attr('startOffset', (slice.angle * 0.23) + '%')
                    .html(slice.angle + '%');
            }


            D3.select(this.svgPieSliceID(slice.id))
                .on('click', function() { this.onSliceClick(slice); }.bind(this))
                .on('mouseover', function() { this.onSliceMouseOver(slice); }.bind(this));
        }
    }

    /**
     * Return the SVG pie slice identifier.
     */
    private svgPieSliceID(idSlice: number) {
        return '#pieSlice-' + this.pie + '-' + idSlice;
    }

    /**
     * This function is invoked when the end-user selects a slice.
     * @param idSlice Slice identifier
     */
    onSliceClick(slice: Slice): void {
        if (this.debug) {
            console.log('onSliceClick(%d)', slice.id);
        }
        this.selected.emit(slice);
    }

    /**xxx
     * This function is invoked when the mouse pointer is located up on the given slice.
     * @param slice the slice highlighted by the end-user mouse.
     */
    onSliceMouseOver(slice: Slice): void {
        if (this.debug) {
            console.log('onSliceMouseOver(%d)', slice.id);
        }
        this.inactiveArcs();
        this.inactiveTexts();
        this.activeArc('#arc-' + this.pie + '-' + slice.type);
        this.activeText('#text-' + this.pie + '-' + slice.type);
        this.activated.emit(slice);
    }

    /**
     * **Inactive** all present arcs in the HTML file.
     */
    private inactiveArcs(): void {
        this.arcs.forEach(arc => this.inactiveArc(arc));
    }

    /**
     * **Inactive** all present arcs in the HTML file.
     */
    private inactiveTexts(): void {
        this.texts.forEach(text => this.inactiveText(text));
    }

    /**
     * **Inactive** the given tooltip arc.
     * @param idArc HTML tooltip arc identifier
     */
    private inactiveArc(idArc: string): void {
        this.setupTooltipArc(idArc, false);
    }

    /**
     * **Active** the given tooltip arc.
     * @param idArc HTML tooltip arc identifier
     */
    private activeArc(idArc: string): void {
        this.setupTooltipArc(idArc, true);
    }

    /**
     * **Inactive** the given tooltip arc.
     * @param idText HTML tooltip TEXT identifier
     */
    private inactiveText(idText: string): void {
        this.setupTooltipText(idText, false);
    }

    /**
     * **Active** the given tooltip arc.
     * @param idText HTML tooltip TEXT identifier
     */
    private activeText(idText: string): void {
        this.setupTooltipText(idText, true);
    }

    /**
     * Setup the color of a tooltip arc depending on its status of active, or inactive
     * @param idArc HTML tooltip arc identifier
     * @param active the active status
     */
    private setupTooltipArc(idArc: string, active: boolean) {
        D3.select(idArc)
            .attr('stroke', (active ? 'black' : 'lightGrey'))
            .attr('marker-start', 'url(#arrow' + (active ? 'Active' : '') + ')')
            .attr('marker-end', 'url(#arrow' + (active ? 'Active' : '') + ')');
    }

    /**
     * Setup the color of a text depending on its status of active, or inactive
     * @param idArc HTML tooltip text identifier
     * @param active the active status
     */
    private setupTooltipText(idText: string, active: boolean) {
        D3.select(idText)
            .attr('class', (active ? 'text-active' : 'text'));
    }

    /**
     * Calling the base class to unsubscribe all subscriptions.
     */
    ngOnDestroy() {
        super.ngOnDestroy();
    }

}
