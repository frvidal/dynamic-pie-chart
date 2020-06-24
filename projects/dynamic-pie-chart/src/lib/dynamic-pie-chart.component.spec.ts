import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicPieChartComponent } from './dynamic-pie-chart.component';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Slice } from 'dist/dynamic-pie-chart/lib/slice';

describe('DynamicPieChartComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;


  @Component({
    selector: 'app-host-component',
    template: `
        <table>
        <tr>
            <td>
                <div style="width:400px;height:400px">
                    <fvi-dynamic-pie-chart
                        [radius]=150
                        [active]=true
                        [legend]=false
                        [slices$]=slices$
                        [pie]=1>
                    </fvi-dynamic-pie-chart>
                </div>
            </td>
            <td>
                <div style="width:400px;height:400px">
                    <fvi-dynamic-pie-chart
                        [radius]=150
                        [active]=true
                        [legend]=true
                        [slices$]=slices$
                        [pie]=2>
                    </fvi-dynamic-pie-chart>
                </div>
            </td>
         </tr>
         <tr>
         <td>
             <div style="width:250px;height:250px">
                 <fvi-dynamic-pie-chart
                     [radius]=150
                     [active]=false
                     [legend]=false
                     [slices$]=slices$
                     [pie]=3>
                 </fvi-dynamic-pie-chart>
             </div>
         </td>
         <td>
             <div style="width:100px;height:100px">
                 <fvi-dynamic-pie-chart
                     [radius]=150
                     [active]=false
                     [legend]=true
                     [slices$]=slices$
                     [pie]=4>
                 </fvi-dynamic-pie-chart>
             </div>
         </td>
      </tr>
      </table>
    `
  })
  class TestHostComponent implements OnInit {
    private slices = [
        {
            id: 0,
            type: 1,
            angle: 45,
            offset: 0,
            color: 'green',
            activated: false,
            selected: false,
            contents: []
        },
        {
            id: 1,
            type: 2,
            angle: 20,
            offset: 0,
            color: 'orange',
            activated: false,
            selected: false,
            contents: []
        },
        {
            id: 2,
            type: 3,
            angle: 10,
            offset: 0,
            color: 'red',
            activated: false,
            selected: false,
            contents: []
        },
        {
            id: 3,
            type: 1,
            angle: 99,
            offset: 0,
            color: 'drakBlue',
            activated: false,
            selected: false,
            contents: []
        },
        {
            id: 4,
            type: 1,
            angle: 31,
            offset: 0,
            color: 'brown',
            activated: false,
            selected: false,
            contents: []
        },
        {
            id: 5,
            type: 1,
            angle: 20,
            offset: 0,
            color: 'blue',
            activated: false,
            selected: false,
            contents: []
        },
        {
            id: 6,
            type: 2,
            angle: 20,
            offset: 0,
            color: 'violet',
            activated: false,
            selected: false,
            contents: []
        },
        {
            id: 7,
            type: 1,
            angle: 40,
            offset: 0,
            color: 'grey',
            activated: false,
            selected: false,
            contents: []
        },
        {
            id: 8,
            type: 3,
            angle: 60,
            offset: 0,
            color: 'darkGreen',
            activated: false,
            selected: false,
            contents: []
        },
        {
            id: 9,
            type: 2,
            angle: 15,
            offset: 0,
            color: 'yellow',
            activated: false,
            selected: false,
            contents: []
        },
    ];
    public slices$ = new BehaviorSubject<Slice[]>([]);

    ngOnInit() {
        this.slices$.next(this.slices);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicPieChartComponent, TestHostComponent ]
    })
    .compileComponents();
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
