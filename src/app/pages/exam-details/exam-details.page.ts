import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.page.html',
  styleUrls: ['./exam-details.page.scss'],
})
export class ExamDetailsPage implements OnInit {

  exam: string;

  constructor(public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.exam = this.route.snapshot.paramMap.get('examName')
  }

}
