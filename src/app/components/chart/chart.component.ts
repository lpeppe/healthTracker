import { ExamResult } from './../../interfaces';
import { chartConfig } from './chart.config';
import { Component, AfterViewInit, Input, OnDestroy } from '@angular/core';
import * as c3 from 'c3';
import { DataService } from '../../services/data/data.service';
import { Observable, Subscription } from 'rxjs';
import { format } from 'date-fns';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnDestroy {

  @Input() exam: string;

  chart: c3.ChartAPI;
  subscriptions: Subscription[];

  constructor(public dataService: DataService) {
    this.subscriptions = [];
  }

  ngAfterViewInit() {
    this.chart = c3.generate(chartConfig());
    this.subscriptions.push(
      this.dataService.getExamResults(this.exam)
        .subscribe(data => this.loadChart(data)),
      this.dataService.getExamDetails(this.exam)
        .subscribe(data => this.loadChartRegions(data))
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
    this.chart.destroy();
  }

  loadChart(data: ExamResult[]) {
    this.chart.load({
      columns: [
        ['x', ...data.map(x => format(new Date(x.date.seconds * 1000), 'YYYY-MM-DD'))],
        ['results', ...data.map(x => x.result)]
      ],
      unload: ['x', 'results']
    })
  }

  loadChartRegions(data) {
    this.chart.regions([{
      axis: 'y',
      start: data.min,
      end: data.max,
    }])
  }

}
