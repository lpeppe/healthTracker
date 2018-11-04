import { AddResultComponent } from './../../components/add-result/add-result.component';
import { ChartComponent } from './../../components/chart/chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExamDetailsPage } from './exam-details.page';

const routes: Routes = [
  {
    path: '',
    component: ExamDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExamDetailsPage, ChartComponent, AddResultComponent]
})
export class ExamDetailsPageModule { }
