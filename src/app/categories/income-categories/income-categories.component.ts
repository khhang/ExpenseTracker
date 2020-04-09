import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IncomeCategory, CategoriesService, ExpenseCategory } from 'src/app/services/categories.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { Observable } from 'rxjs';
import { EditCategoryModalComponent } from '../edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'app-income-categories',
  templateUrl: './income-categories.component.html',
  styleUrls: ['./income-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  async openEditCategoryModal(category: ExpenseCategory): Promise<void> {
    const modal = await this.modalController.create({
      component: EditCategoryModalComponent,
      componentProps: category
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(result => {
        if (result.data) {
          this.categoriesService.updateIncomeCategory(result.data).subscribe(() => {
            this.categoriesService.refresh$.next(undefined);
            this.toastService.presentToast('Edited the income category');
          });
        }
      });
  }

  async openDeleteCategoryConfirmation(cat: ExpenseCategory): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Income Category',
      message: `Are you sure you want to delete the income category ${cat.name}?`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.categoriesService.deleteIncomeCategory(cat.id).subscribe(() => {
              this.categoriesService.refresh$.next(undefined);
              this.toastService.presentToast('Deleted the income category');
            });
          }
        },
        {
          text: 'Cancel',
          cssClass: 'secondary'
        }
      ]
    });

    await alert.present();
  }

}
