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
                        [radius]=150
                        [active]=true
                        [legend]=false
                        [slices$]=slices$
                        [typeSlices$]=typeSlices$
                        [pie]=1>
                    </lib-dynamic-pie-chart>
                </div>
            </td>
            <td>
                <div style="width:400px;height:400px">
                    <lib-dynamic-pie-chart
                        [radius]=150
                        [active]=true
                        [legend]=true
                        [slices$]=slices$
                        [typeSlices$]=typeSlices$
                        [pie]=2>
                    </lib-dynamic-pie-chart>
                </div>
            </td>
         </tr>
         <tr>
         <td>
             <div style="width:250px;height:250px">
                 <lib-dynamic-pie-chart
                     [radius]=150
                     [active]=false
                     [legend]=false
                     [slices$]=slices$
                     [typeSlices$]=typeSlices$
                     [pie]=3>
                 </lib-dynamic-pie-chart>
             </div>
         </td>
         <td>
             <div style="width:100px;height:100px">
                 <lib-dynamic-pie-chart
                     [radius]=150
                     [active]=false
                     [legend]=true
                     [slices$]=slices$
                     [typeSlices$]=typeSlices$
                     [pie]=4>
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
            tab.push (1);
            tab.push (3);
            tab.push (8);
            this.filteredIds$.next(tab);

            const typeSlices = [];
            typeSlices.push(new TypeSlice(1, 'the label One'));
            typeSlices.push(new TypeSlice(2, 'das label Zwei'));
            typeSlices.push(new TypeSlice(3, 'el label Tres'));
            typeSlices.push(new TypeSlice(4, 'The label Four...'));
            this.typeSlices$.next(typeSlices);
            this.slices$.next(initSlicesOne());

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

    it('should be created without problem.', () => {
        expect(component).toBeTruthy();
    });

    it('should accept the dynamic change of angles.', () => {
        expect(component).toBeTruthy();
        setTimeout(() => {
            component.slices$.next(initSlicesTwo());
            fixture.detectChanges();
        }, 5000);
    });

    it('should dynamic change the filtered slices.', () => {
        expect(component).toBeTruthy();
        setTimeout(() => {
            const filteredIds = [];
            component.filteredIds$.next([]);
            filteredIds.push(2);
            filteredIds.push(4);
            filteredIds.push(6);
            component.filteredIds$.next(filteredIds);
            fixture.detectChanges();
        }, 7000);
    });

});
