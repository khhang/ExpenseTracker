import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ExpenseCategory, ExpenseSubcategory } from 'src/app/services/categories.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'create-subcategory-modal',
  templateUrl: './create-subcategory-modal.component.html',
  styleUrls: ['./create-subcategory-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSubcategoryModalComponent implements OnInit {

  category: ExpenseCategory;

  subcategoryForm: FormGroup = this.fb.group({
    categoryId: [{value: '', disabled: true}, Validators.required],
    name: ['', Validators.required]
  });

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.category = this.navParams.data as ExpenseCategory;
    this.subcategoryForm.get('categoryId').setValue(this.category.id);
  }

  dismissModal(formValues: CreateSubcategoryForm): void {
    let subcategory: ExpenseSubcategory;
    if (formValues) {
      subcategory = {
        name: formValues.name,
        categoryId: formValues.categoryId
      };
    }
    this.modalController.dismiss(subcategory);
  }

}

export interface CreateSubcategoryForm {
  categoryId: number;
  name: string;
}
