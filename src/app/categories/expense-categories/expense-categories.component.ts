import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CategoriesService, ExpenseCategory, ExpenseSubcategory } from 'src/app/services/categories.service';
import { ModalController, AlertController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { CreateSubcategoryModalComponent } from '../create-subcategory-modal/create-subcategory-modal.component';
import { EditSubcategoryModalComponent } from '../edit-subcategory-modal/edit-subcategory-modal.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EditCategoryModalComponent } from '../edit-category-modal/edit-category-modal.component';

@Component({
  selector: 'app-expense-categories',
  templateUrl: './expense-categories.component.html',
  styleUrls: ['./expense-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseCategoriesComponent implements OnInit {

  expenseCategories$: Observable<ExpenseCategory[]> = this.categoriesService.expenseCategories$;
  expenseSubcategories$: Observable<ExpenseSubcategory[]> = this.categoriesService.expenseSubcategories$;

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
          this.categoriesService.updateCategory(result.data).subscribe(() => {
            this.categoriesService.refresh$.next(undefined);
            this.toastService.presentToast('Edited the category');
          });
        }
      });
  }

  async openCreateSubcategoryModal(category: ExpenseCategory): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateSubcategoryModalComponent,
      componentProps: category
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(result => {
        if (result.data) {
          this.categoriesService.createSubcategory(result.data).subscribe(() => {
            this.categoriesService.refresh$.next(undefined);
            this.toastService.presentToast('Successfully created a new subcategory');
          });
        }
      });
  }

  async openEditSubcategoryModal(subcategory: ExpenseSubcategory): Promise<void> {
    const modal = await this.modalController.create({
      component: EditSubcategoryModalComponent,
      componentProps: subcategory
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(result => {
        if (result.data) {
          this.categoriesService.updateSubcategory(result.data).subscribe(() => {
            this.categoriesService.refresh$.next(undefined);
            this.toastService.presentToast('Edited a subcategory');
          });
        }
      });
  }

  async openDeleteSubcategoryConfirmation(subcat: ExpenseSubcategory): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Subcategory',
      message: `Are you sure you want to delete the category ${subcat.name}?`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.categoriesService.deleteSubcategory(subcat.id).subscribe(() => {
              this.categoriesService.refresh$.next(undefined);
              this.toastService.presentToast('Deleted the subcategory');
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

  async openDeleteCategoryConfirmation(cat: ExpenseCategory): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Category',
      message: `Are you sure you want to delete the category ${cat.name}?`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.categoriesService.deleteCategory(cat.id).subscribe(() => {
              this.categoriesService.refresh$.next(undefined);
              this.toastService.presentToast('Deleted the category');
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
