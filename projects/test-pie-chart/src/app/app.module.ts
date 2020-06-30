import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicPieChartModule } from '@fitzhi/dynamic-pie-chart';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, DynamicPieChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
