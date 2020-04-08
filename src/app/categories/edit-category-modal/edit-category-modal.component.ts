import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ExpenseCategory } from 'src/app/services/categories.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-category-modal',
  templateUrl: './edit-category-modal.component.html',
  styleUrls: ['./edit-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCategoryModalComponent implements OnInit {

  category: ExpenseCategory;

  categoryForm: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.category = this.navParams.data as ExpenseCategory;
    this.categoryForm.patchValue({ name: this.category.name});
  }

  dismissModal(formValues: EditCategoryForm) {
    let category: ExpenseCategory;
    if (formValues) {
      category = {
        id: this.category.id,
        name: formValues.name
      };
    }

    this.modalCtrl.dismiss(category);
  }

}

export interface EditCategoryForm {
  name: string;
}
