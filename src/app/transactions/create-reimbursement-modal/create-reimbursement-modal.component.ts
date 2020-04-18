import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CategoriesService, ExpenseCategory, ExpenseSubcategory } from 'src/app/services/categories.service';
import { AccountsService, Account } from 'src/app/services/accounts.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Reimbursement } from 'src/app/services/transactions.service';

@Component({
  selector: 'create-reimbursement-modal',
  templateUrl: './create-reimbursement-modal.component.html',
  styleUrls: ['./create-reimbursement-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateReimbursementModalComponent implements OnInit {

  readonly CATEGORY_KEY = 'category';
  readonly SUBCATEGORY_KEY = 'subcategory';

  expenseCategories$: Observable<ExpenseCategory[]> = this.categoriesService.expenseCategories$;
  updateSubcategories$: BehaviorSubject<undefined> = new BehaviorSubject<undefined>(undefined);
  expenseSubcategories$: Observable<ExpenseSubcategory[]> = this.updateSubcategories$.pipe(
    switchMap(() => this.categoriesService.expenseSubcategories$),
    map(subcats => {
      const categoryId = this.category.value;
      const availableSubcategories = subcats.filter(x => x.categoryId === categoryId);
      if (availableSubcategories.length > 0) {
        this.subcategory.enable();
      }
      return availableSubcategories;
    })
  );

  accounts$: Observable<Account[]> = this.accountsService.getAccounts();

  reimbursementForm: FormGroup = this.fb.group({
    account: ['', Validators.required],
    description: ['', Validators.required],
    amount: ['', Validators.required],
    category: [null, Validators.required],
    subcategory: [{value: '', disabled: true}],
    date: new Date().toUTCString()
  });

  get category(): FormControl { return this.reimbursementForm.controls[this.CATEGORY_KEY] as FormControl; }
  get subcategory(): FormControl { return this.reimbursementForm.controls[this.SUBCATEGORY_KEY] as FormControl; }

  constructor(
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
    private fb: FormBuilder,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.category.valueChanges.subscribe(() => {
      this.subcategory.patchValue('', { emitEvent: false });
      this.subcategory.disable();
      this.updateSubcategories$.next(undefined);
    });
  }

  dismissModal(formValues: CreateReimbursementForm): void {
    let expense: Reimbursement;
    if (formValues) {
      expense = {
        accountId: formValues.account,
        description: formValues.description,
        amount: parseFloat(formValues.amount) ? parseFloat(formValues.amount) : 0,
        expenseCategoryId: formValues.category,
        expenseSubcategoryId: formValues.subcategory,
        createDate: formValues.date
      };
    }

    this.modalController.dismiss(expense);
  }

}

export interface CreateReimbursementForm {
  account: number;
  description: string;
  amount: string;
  category: number;
  subcategory: number;
  date: string;
}