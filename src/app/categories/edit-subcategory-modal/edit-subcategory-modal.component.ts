import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ExpenseSubcategory, ExpenseCategory, CategoriesService } from 'src/app/services/categories.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'edit-subcategory-modal',
  templateUrl: './edit-subcategory-modal.component.html',
  styleUrls: ['./edit-subcategory-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSubcategoryModalComponent implements OnInit {

  categories: ExpenseCategory[];
  subcategory: ExpenseSubcategory;

  subcategoryForm: FormGroup = this.fb.group({
    categoryId: [{value: '', disabled: 'true'}, Validators.required],
    name: ['', Validators.required]
  });

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;

      this.subcategory = this.navParams.data as ExpenseSubcategory;

      setTimeout(() => {
        this.subcategoryForm.patchValue({
          categoryId: this.subcategory.categoryId,
          name: this.subcategory.name
        });
      }, 0);

      this.cdr.markForCheck();
    });
  }

  dismissModal(formValues: EditSubcategoryForm): void {
    let subcategory: ExpenseSubcategory;
    if (formValues) {
      subcategory = {
        name: formValues.name,
        id: this.subcategory.id,
        categoryId: formValues.categoryId
      };
    }
    this.modalController.dismiss(subcategory);
  }

}

export interface EditSubcategoryForm {
  categoryId: number;
  name: string;
}
