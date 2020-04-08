import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ExpenseCategory } from 'src/app/services/categories.service';

@Component({
  selector: 'create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateCategoryModalComponent implements OnInit {

  categoryForm = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  dismissModal(formValues: CreateCategoryForm): void {
    let category: ExpenseCategory;
    if (formValues) {
       category = {
        name: formValues.name
      };
    }
    this.modalController.dismiss(category);
  }
}

export interface CreateCategoryForm {
  name: string;
}
