import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { ExpenseCategory, ExpenseSubcategory, CategoriesService } from 'src/app/services/categories.service';
import { switchMap, map } from 'rxjs/operators';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AccountsService, Account } from 'src/app/services/accounts.service';
import { NavParams, ModalController } from '@ionic/angular';
import { Expense, ExpenseDetail } from 'src/app/services/transactions.service';

@Component({
  selector: 'edit-expense-modal',
  templateUrl: './edit-expense-modal.component.html',
  styleUrls: ['./edit-expense-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditExpenseModalComponent implements OnInit {

  readonly CATEGORY_KEY = 'category';
  readonly SUBCATEGORY_KEY = 'subcategory';

  expenseCategories: ExpenseCategory[];
  expenseSubcategories: ExpenseSubcategory[];
  availableSubcategories: ExpenseSubcategory[];
  accounts: Account[];

  expenseDetail: ExpenseDetail = this.navParams.data as ExpenseDetail;
  isExpense: boolean;

  expenseForm: FormGroup = this.fb.group({
    account: ['', Validators.required],
    description: ['', Validators.required],
    amount: ['', Validators.required],
    category: [null, Validators.required],
    subcategory: [{value: '', disabled: true}],
    date: ''
  });

  get category(): FormControl { return this.expenseForm.controls[this.CATEGORY_KEY] as FormControl; }
  get subcategory(): FormControl { return this.expenseForm.controls[this.SUBCATEGORY_KEY] as FormControl; }

  constructor(
    private accountsService: AccountsService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private navParams: NavParams,
    private modalController: ModalController,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.isExpense = this.navParams.data.isExpense;
    this.expenseDetail = this.navParams.data as ExpenseDetail;

    const sources: DropdownObservables = {
      expenseCategories: this.categoriesService.getCategories(),
      expenseSubcategories: this.categoriesService.getSubcategories(),
      accounts: this.accountsService.getAccounts()
    };

    forkJoin(sources).subscribe((result: DropdownRequest) => {
      console.log(result);
      this.expenseCategories = result.expenseCategories;
      this.expenseSubcategories = result.expenseSubcategories;
      this.accounts = result.accounts;

      this.updateSubcategories(this.expenseDetail.expenseCategoryId);

      setTimeout(() => {
        this.expenseForm.setValue({
          account: this.expenseDetail.accountId,
          description: this.expenseDetail.description,
          amount: this.expenseDetail.amount,
          category: this.expenseDetail.expenseCategoryId,
          subcategory: this.expenseDetail.expenseSubcategoryId,
          date: this.expenseDetail.createDate
        });

        this.category.valueChanges.subscribe((value) => {
          console.log('updating');
          this.updateSubcategories(value);
          this.cdr.markForCheck();
        });
      }, 0);

      this.cdr.markForCheck();
    });
  }

  updateSubcategories(categoryId: number): void {
    this.subcategory.patchValue('');
    this.subcategory.disable();
    this.availableSubcategories = this.expenseSubcategories.filter(subcat => subcat.categoryId === categoryId);
    if (this.availableSubcategories.length > 0) {
      this.subcategory.enable();
    }
  }

  dismissModal(formValues: EditExpenseForm): void {
    let expense: Expense;
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

export interface EditExpenseForm {
  account: number;
  description: string;
  amount: string;
  category: number;
  subcategory: number;
  date: string;
}

export interface DropdownObservables {
  expenseCategories: Observable<ExpenseCategory[]>;
  expenseSubcategories: Observable<ExpenseSubcategory[]>;
  accounts: Observable<Account[]>;
}

export interface DropdownRequest {
  expenseCategories: ExpenseCategory[];
  expenseSubcategories: ExpenseSubcategory[];
  accounts: Account[];
}
