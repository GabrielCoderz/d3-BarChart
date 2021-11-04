import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarChart2Component } from './bar-chart2/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    BarChart2Component,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
