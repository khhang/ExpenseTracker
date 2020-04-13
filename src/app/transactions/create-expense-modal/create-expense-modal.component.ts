import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CategoriesService, ExpenseCategory, ExpenseSubcategory } from 'src/app/services/categories.service';
import { AccountsService, Account } from 'src/app/services/accounts.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Expense } from 'src/app/services/transactions.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'create-expense-modal',
  templateUrl: './create-expense-modal.component.html',
  styleUrls: ['./create-expense-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateExpenseModalComponent implements OnInit {

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
  isExpense: boolean;

  // TODO: Double check date-time format
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
    private categoriesService: CategoriesService,
    private accountsService: AccountsService,
    private fb: FormBuilder,
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.isExpense = this.navParams.data.isExpense;

    this.category.valueChanges.subscribe(() => {
      this.subcategory.patchValue('', { emitEvent: false });
      this.subcategory.disable();
      this.updateSubcategories$.next(undefined);
    });
  }

  dismissModal(formValues: CreateExpenseForm): void {
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

export interface CreateExpenseForm {
  account: number;
  description: string;
  amount: string;
  category: number;
  subcategory: number;
  date: string;
}
