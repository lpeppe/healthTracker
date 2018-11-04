import { Router } from '@angular/router';
import { DataService } from './../../services/data/data.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public dataService: DataService, public router: Router) { }
  exams: Observable<string[]>;

  ngOnInit() {
    this.exams = this.dataService.getExamNames();
  }

}
