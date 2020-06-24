import { NgModule } from '@angular/core';
import { DynamicPieChartComponent } from './dynamic-pie-chart.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
      DynamicPieChartComponent
    ],
  imports: [
      BrowserModule,
  ],
  exports: [DynamicPieChartComponent]
})
export class DynamicPieChartModule { }
