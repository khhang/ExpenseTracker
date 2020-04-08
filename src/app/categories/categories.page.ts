import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CategoriesService, ExpenseCategory, ExpenseSubcategory } from '../services/categories.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ModalController, AlertController } from '@ionic/angular';
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';
import { switchMap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';
import { CreateSubcategoryModalComponent } from './create-subcategory-modal/create-subcategory-modal.component';
import { EditSubcategoryModalComponent } from './edit-subcategory-modal/edit-subcategory-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPage implements OnInit {

  title = 'Categories';
  refresh$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  expenseCategories$: Observable<ExpenseCategory[]> = this.refresh$.pipe(
    switchMap(() => this.categoriesService.getCategories())
  );
  expenseSubcategories$: Observable<ExpenseSubcategory[]> = this.refresh$.pipe(
    switchMap(() => this.categoriesService.getSubcategories())
  );

  constructor(
    private categoriesService: CategoriesService,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastService: ToastService
    ) { }

  ngOnInit() {}

  async openCreateCategoryModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateCategoryModalComponent
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(result => {
        if (result.data) {
          this.categoriesService.createCategory(result.data).subscribe(() => {
            this.refresh$.next(undefined);
            this.toastService.presentToast('Succesfully created a new category');
          });
        }
      });
  }

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
            this.refresh$.next(undefined);
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
            this.refresh$.next(undefined);
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
            this.refresh$.next(undefined);
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
              this.refresh$.next(undefined);
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
              this.refresh$.next(undefined);
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
