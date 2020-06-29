import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { DynamicPieChartService } from './dynamic-pie-chart.service';
import { Component, OnInit } from '@angular/core';
import { TypeSlice } from './type-slice';
import { MockSlicesOne } from './mock-slices-one';
import { Slice } from 'dist/dynamic-pie-chart/lib/slice';

describe('DynamicPieChartService', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let service: DynamicPieChartService;

    @Component({
        selector: 'app-host-component',
        template:
            `
            <div  *ngIf="d1" style="width:400px; height:400px;background-color:lightGrey">
                <svg class="pie" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path id="test" stroke="black" fill="none" stroke-width="1" attr.d="{{d1}}"></path>
                        <path id="test" stroke="black" fill="none" stroke-width="1" attr.d="{{d2}}"></path>
                    </g>
                    <circle cx="100" cy="100" r="70" stroke="grey" stroke-width="1" fill="lightGreen" />
                </svg>
            </div>
            `
    })
    class TestHostComponent implements OnInit {
        public d1: string;
        public d2: string;
        ngOnInit() {
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.inject(DynamicPieChartService);
    });

    it('Test the design of an arc of 90 degrees', () => {
        expect(component).toBeTruthy();
        component.d1 = service.describeArc(100, 100, 75, 0, 200);
        component.d2 = service.describeArc(100, 100, 75, 200, 360);
        fixture.detectChanges();
        const unit = component.d1.split(' ');
        console.log(component.d1);
    });

    it('test the method buildChartTypeSlices', () => {

        function compare(s1: Slice, s2: Slice) {
            return (s1.type - s2.type);
        }

        function calculateOffset(slices: Slice[]) {
            let offset = 0;
            slices.sort((s1: Slice, s2: Slice) => compare(s1, s2))
                .forEach(slice => {
                    slice.offset = offset;
                    offset += slice.angle;
                });
        }

        const typeSlices = [];
        typeSlices.push(new TypeSlice(1, 'the label One'));
        typeSlices.push(new TypeSlice(2, 'das label Zwei'));
        typeSlices.push(new TypeSlice(3, 'el label Tres'));
        typeSlices.push(new TypeSlice(4, 'The label Four...'));
        calculateOffset(MockSlicesOne);
        const result = service.buildChartTypeSlices(typeSlices, MockSlicesOne);

        expect(result[0].type).toBe(1);
        expect(result[0].startingAngle).toBe(0);
        expect(result[0].endingAngle).toBe(235);

        expect(result[1].type).toBe(2);
        expect(result[1].startingAngle).toBe(235);
        expect(result[1].endingAngle).toBe(290);

        expect(result[2].type).toBe(3);
        expect(result[2].startingAngle).toBe(290);
        expect(result[2].endingAngle).toBe(360);
    });


});
