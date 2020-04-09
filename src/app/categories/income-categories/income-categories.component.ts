import { Component, OnInit } from '@angular/core';
import { IncomeCategory, CategoriesService } from 'src/app/services/categories.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-income-categories',
  templateUrl: './income-categories.component.html',
  styleUrls: ['./income-categories.component.scss'],
})
export class IncomeCategoriesComponent implements OnInit {

  incomeCategories$: Observable<IncomeCategory[]> = this.categoriesService.incomeCategories$;

  constructor(
    private categoriesService: CategoriesService,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastService: ToastService
  ) { }

  ngOnInit() {}

}
