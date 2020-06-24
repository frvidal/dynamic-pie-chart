import { TestBed } from '@angular/core/testing';

import { DynamicPieChartService } from './dynamic-pie-chart.service';

describe('DynamicPieChartService', () => {
  let service: DynamicPieChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicPieChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
