import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
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

  expenseDetail: ExpenseDetail;
  accounts$: Observable<Account[]> = this.accountsService.getAccounts();
  isExpense: boolean;

  expenseForm: FormGroup = this.fb.group({
    account: ['', Validators.required],
    description: ['', Validators.required],
    amount: ['', Validators.required],
    category: [null, Validators.required],
    subcategory: [{value: '', disabled: true}],
    date: new Date().toUTCString()
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

    this.category.valueChanges.subscribe(() => {
      this.subcategory.patchValue('', { emitEvent: false });
      this.subcategory.disable();
      this.updateSubcategories$.next(undefined);
    });

    this.expenseDetail = this.navParams.data as ExpenseDetail;

    // TODO: Set the form values using expense detail
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
