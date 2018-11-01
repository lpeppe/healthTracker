import { DataService } from './../../services/data/data.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public dataService: DataService) { }
  exams: Observable<string[]>;

  ngOnInit() {
    this.exams = this.dataService.getExamNames();
  }

}
