import { DataService } from './../../services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { Exam } from './../../interfaces';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.page.html',
  styleUrls: ['./add-exam.page.scss'],
})
export class AddExamPage {

  exam: Exam

  constructor(
    public dataService: DataService,
    public loadingController: LoadingController,
    public router: Router
  ) {
    this.exam = {
      name: '',
      unit: '',
      min: 0,
      max: 0
    };
  }

  async onSubmit() {
    const loading = await this.loadingController.create();
    loading.present();
    this.dataService.insertExam(this.exam)
      .then(() => {
        loading.dismiss();
        this.router.navigateByUrl('');
      })
      .catch(err => {
        console.log(err)
        loading.dismiss()
        this.router.navigateByUrl('');
      })
  }

}
