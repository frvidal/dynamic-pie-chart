import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicPieChartComponent } from './dynamic-pie-chart.component';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Slice } from './slice';
import { TypeSlice } from './type-slice';
import { MockSlicesTwoOrdered } from './mock-slices-two-ordered';

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
                        [radius]=150
                        [active]=true
                        [legend]=false
                        [slices$]=slices$
                        [filteredIds$]=filteredIds$
                        [typeSlices$]=typeSlices$
                        [pie]=1>
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
            const tab = [];
            tab.push (0);
            this.filteredIds$.next(tab);

            const typeSlices = [];
            typeSlices.push(new TypeSlice(1, 'the label One'));
            typeSlices.push(new TypeSlice(2, 'das label Zwei'));
            typeSlices.push(new TypeSlice(3, 'el label Tres'));
            typeSlices.push(new TypeSlice(4, 'The label Four...'));
            this.typeSlices$.next(typeSlices);
            this.slices$.next(initSlicesTwo());

        }
    }

    function initSlicesTwo() {
        return MockSlicesTwoOrdered;
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

    it('dynamic change the filtered slices', () => {
        expect(component).toBeTruthy();
        setTimeout(() => { 
            const filteredIds = [];
            filteredIds.push(4);
            component.filteredIds$.next(filteredIds);
        }, 100) ;

        /* Possible animation ?
        for (let i = 0; i < 9; i++) {
            setTimeout(() => {
                const filteredIds = [];
                filteredIds.push(i);
                component.filteredIds$.next(filteredIds);
                fixture.detectChanges();
            }, 100 * i );
        }
        */
    });

});
