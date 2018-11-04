import { chartConfig } from './chart.config';
import { Component, AfterViewInit, Input, OnInit, OnDestroy } from '@angular/core';
import * as c3 from 'c3';
import { DataService } from '../../services/data/data.service';
import { Observable, Subscription } from 'rxjs';
import { ExamResult } from '../../interfaces';
import { format } from 'date-fns';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnInit, OnDestroy {

  @Input() exam: string;

  chart: c3.ChartAPI;
  data: Observable<ExamResult[]>;
  subscriptions: Subscription[];

  constructor(public dataService: DataService) {
    this.subscriptions = [];
  }

  ngOnInit() {
    this.data = this.dataService.getExamResults(this.exam)
  }

  ngAfterViewInit() {
    this.chart = c3.generate(chartConfig());
    this.subscriptions.push(
      this.data.subscribe(data => {
        this.chart.load({
          columns: [
            ['x', ...data.map(x => format(new Date(x.date.seconds * 1000), 'YYYY-MM-DD'))],
            ['results', ...data.map(x => x.result)]
          ],
          unload: ['x', 'results']
        })
      }),
      this.dataService.getExamDetails(this.exam)
        .subscribe(data => {
          this.chart.regions([{
            axis: 'y',
            start: data.min,
            end: data.max,
          }])
        })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

}
