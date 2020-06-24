import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BehaviorSubject } from 'rxjs';
import { Slice } from 'dist/dynamic-pie-chart/lib/slice';
import { DynamicPieChartModule } from 'projects/dynamic-pie-chart/src/public-api';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
          DynamicPieChartModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const slices$ = new BehaviorSubject<Slice[]>([]);

    const slices = 			[
        {
            id: 0,
            type: 1,
            angle: 45,
            color: 'green',
            offset: 0,
            activated: false,
            selected: false,
            projects: []
        },
        {
            id: 1,
            type: 2,
            angle: 20,
            color: 'orange',
            offset: 45,
            activated: false,
            selected: false,
            projects: []
        },
        {
            id: 2,
            type: 3,
            angle: 10,
            color: 'red',
            offset: 65,
            activated: false,
            selected: false,
            projects: []
        },
        {
            id: 3,
            type: 1,
            angle: 99,
            color: 'blue',
            offset: 75,
            activated: false,
            selected: false,
            projects: []
        }
    ];

    const app = fixture.componentInstance;
    expect(app).toBeTruthy();

  });

});
