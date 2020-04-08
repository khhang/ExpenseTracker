import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ExpenseCategory, ExpenseSubcategory } from 'src/app/services/categories.service';
import { ModalController, AlertController, PopoverController } from '@ionic/angular';
import { SubcategoryActionsMenuComponent, SubcategoryAction } from '../subcategory-actions-menu/subcategory-actions-menu.component';

@Component({
  selector: 'category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDetailsComponent implements OnInit {

  @Input() category: ExpenseCategory;
  @Input() subcategories: ExpenseSubcategory[];

  @Output() editCategory: EventEmitter<ExpenseCategory> = new EventEmitter<ExpenseCategory>();
  @Output() deleteCategory: EventEmitter<ExpenseCategory> = new EventEmitter<ExpenseCategory>();
  @Output() createSubcategory: EventEmitter<ExpenseCategory> = new EventEmitter<ExpenseSubcategory>();
  @Output() editSubcategory: EventEmitter<ExpenseSubcategory> = new EventEmitter<ExpenseSubcategory>();
  @Output() deleteSubcategory: EventEmitter<ExpenseSubcategory> = new EventEmitter<ExpenseSubcategory>();

  get filteredSubcategories(): ExpenseSubcategory[] {
    return this.subcategories ? this.subcategories.filter(subcat => subcat.categoryId === this.category.id) : [];
  }

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  deleteCategoryClicked(category: ExpenseCategory) {
    this.deleteCategory.emit(category);
  }

  editCategoryClicked(category: ExpenseCategory) {
    this.editCategory.emit(category);
  }

  createSubcategoryClicked(category: ExpenseCategory) {
    this.createSubcategory.emit(category);
  }

  async openActionsMenu(e: any, cat: ExpenseCategory, subcat: ExpenseSubcategory): Promise<void> {
    const popover = await this.popoverController.create({
      component: SubcategoryActionsMenuComponent,
      event: e,
      showBackdrop: false,
      componentProps: {
        category: cat,
        subcategory: subcat
      }
    });

    await popover.present();

    await popover.onWillDismiss()
      .then(result => {
        if (result.data) {
          const { action, subcategory } = result.data;

          switch (action.id) {
            case SubcategoryAction.EDIT:
              this.editSubcategory.emit(subcategory);
              break;
            case SubcategoryAction.DELETE:
              this.deleteSubcategory.emit(subcategory);
              break;
            default:
              break;
          }
        }
      });
  }

}
