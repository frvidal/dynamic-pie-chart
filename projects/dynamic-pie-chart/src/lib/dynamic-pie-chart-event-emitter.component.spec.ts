import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicPieChartComponent } from './dynamic-pie-chart.component';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Slice } from './slice';
import { TypeSlice } from './type-slice';
import { MockSlicesOne } from './mock-slices-one';
import { MockSlicesTwo } from './mock-slices-two';

describe('DynamicPieChartComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    @Component({
        selector: 'lib-app-host-component',
        template: `
        <table>
        <tr>
            <td>
                <div style="width:400px;height:400px">
                    <lib-dynamic-pie-chart
                        [pie]=1
                        [radius]=150
                        [active]=true
                        [legend]=true
                        [slices$]=slices$
                        [typeSlices$]=typeSlices$
                        (selected)="onSliceSelection($event)"
                        (activated)="onSliceActivation($event)">
                    </lib-dynamic-pie-chart>
                </div>
            </td>
      </tr>
      </table>
    `
    })
    class TestHostComponent implements OnInit {

        public slices$ = new BehaviorSubject<Slice[]>([]);
        public typeSlices$ = new BehaviorSubject<TypeSlice[]>([]);
        public filteredIds$ = new BehaviorSubject<number[]>([]);

        ngOnInit() {
            const typeSlices = [];
            typeSlices.push(new TypeSlice(1, 'the label One'));
            typeSlices.push(new TypeSlice(2, 'das label Zwei'));
            typeSlices.push(new TypeSlice(3, 'el label Tres'));
            typeSlices.push(new TypeSlice(4, 'The label Four...'));
            this.typeSlices$.next(typeSlices);
            this.slices$.next(initSlicesOne());

        }

        public onSliceSelection(slice: Slice) {
            console.log ('slice selected', slice.id);
        }

        public onSliceActivation(slice: Slice) {
            console.log ('slice activated', slice.id);
        }

    }

    function initSlicesOne() {
        return MockSlicesOne;
    }

    function initSlicesTwo() {
        return MockSlicesTwo;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicPieChartComponent, TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
