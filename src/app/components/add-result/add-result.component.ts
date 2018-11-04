import { DataService } from './../../services/data/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent {

  @Input() exam: string;

  result: {
    result: number,
    date: string
  }

  constructor(public dataService: DataService, public loadingController: LoadingController) {
    this.result = {
      result: 0,
      date: new Date().toISOString()
    }
  }

  async onSubmit() {
    const loading = await this.loadingController.create();
    loading.present();
    this.dataService.addExamResult(this.exam, this.result.result, new Date(this.result.date))
      .then(() => loading.dismiss())
      .catch(err => {
        console.log(err)
        loading.dismiss()
      })
  }

}
