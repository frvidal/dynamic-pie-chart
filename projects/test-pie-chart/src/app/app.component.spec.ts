import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { TypeSlice, Slice, DynamicPieChartModule } from 'dynamic-pie-chart';

describe('AppComponent', () => {

  @Component({
    selector: 'app-host-component',
    template: `
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
        `
  })
  class TestHostComponent {
    public slices$ = new BehaviorSubject<Slice[]>([]);
    public typeSlices$ = new BehaviorSubject<TypeSlice[]>([]);
    public loadData() {
      const typeSlices = [
        {type: 1, label: 'label 1'},
        {type: 2, label: 'label 2'},
        {type: 3, label: 'label 3'}
      ];
      this.typeSlices$.next(typeSlices);

      const slices = [
          {
              id: 0,
              type: 3,
              angle: 45,
              backgroundColor: 'green',
              textColor: 'black',
              textFontSize: '20px',
              offset: 0,
              activated: false,
              selected: false,
              data: 0,
              children: []
          },
          {
              id: 1,
              type: 2,
              angle: 20,
              backgroundColor: 'orange',
              textColor: 'black',
              textFontSize: '13px',
              offset: 45,
              activated: false,
              selected: false,
              data: 0,
              children: []
          },
          {
              id: 2,
              type: 1,
              angle: 10,
              backgroundColor: 'red',
              textColor: 'green',
              textFontSize: '24px',
              offset: 65,
              activated: false,
              selected: false,
              data: 0,
              children: []
          },
          {
              id: 3,
              type: 1,
              angle: 99,
              backgroundColor: 'blue',
              textColor: 'red',
              textFontSize: '30px',
              offset: 75,
              activated: false,
              selected: false,
              data: 0,
              children: []
          }
      ];
      this.slices$.next(slices);
      }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, TestHostComponent
      ],
      imports: [
          DynamicPieChartModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    app.loadData();
    fixture.detectChanges();


  });

});
