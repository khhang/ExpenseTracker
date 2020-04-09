import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { ModalController, IonTabs } from '@ionic/angular';
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPage implements OnInit {

  @ViewChild(IonTabs, { static: false }) tabs: IonTabs;

  readonly expenseTabKey = 'expense';
  readonly incomeTab = 'income';
  title = 'Categories';

  constructor(
    private categoriesService: CategoriesService,
    private modalController: ModalController,
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
          if (this.tabs.getSelected() === this.expenseTabKey) {
            this.categoriesService.createCategory(result.data).subscribe(() => {
              this.categoriesService.refresh$.next(undefined);
              this.toastService.presentToast('Succesfully created a new expense category');
            });
          } else if (this.tabs.getSelected() === this.incomeTab) {
            this.categoriesService.createCategory(result.data).subscribe(() => {
              this.categoriesService.refresh$.next(undefined);
              this.toastService.presentToast('Succesfully created a new expense category');
            });
          }
        }
      });
  }
}
