import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ExpenseCategory, ExpenseSubcategory, CategoriesService } from 'src/app/services/categories.service';
import { ReimbursementDetail, Reimbursement } from 'src/app/services/transactions.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AccountsService, Account } from 'src/app/services/accounts.service';
import { NavParams, ModalController } from '@ionic/angular';
import { DropdownObservables, DropdownRequest } from '../edit-expense-modal/edit-expense-modal.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'edit-reimbursement-modal',
  templateUrl: './edit-reimbursement-modal.component.html',
  styleUrls: ['./edit-reimbursement-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditReimbursementModalComponent implements OnInit {

  readonly CATEGORY_KEY = 'category';
  readonly SUBCATEGORY_KEY = 'subcategory';

  expenseCategories: ExpenseCategory[];
  expenseSubcategories: ExpenseSubcategory[];
  availableSubcategories: ExpenseSubcategory[];
  accounts: Account[];

  reimbursementDetail: ReimbursementDetail = this.navParams.data as ReimbursementDetail;
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
    this.reimbursementDetail = this.navParams.data as ReimbursementDetail;

    const sources: DropdownObservables = {
      expenseCategories: this.categoriesService.getCategories(),
      expenseSubcategories: this.categoriesService.getSubcategories(),
      accounts: this.accountsService.getAccounts()
    };

    forkJoin(sources).subscribe((result: DropdownRequest) => {
      this.expenseCategories = result.expenseCategories;
      this.expenseSubcategories = result.expenseSubcategories;
      this.accounts = result.accounts;

      this.updateSubcategories(this.reimbursementDetail.expenseCategoryId);

      setTimeout(() => {
        this.expenseForm.setValue({
          account: this.reimbursementDetail.accountId,
          description: this.reimbursementDetail.description,
          amount: this.reimbursementDetail.amount,
          category: this.reimbursementDetail.expenseCategoryId,
          subcategory: this.reimbursementDetail.expenseSubcategoryId,
          date: this.reimbursementDetail.createDate
        });

        this.category.valueChanges.subscribe((value) => {
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

  dismissModal(formValues: EditReimbursementForm): void {
    let expense: Reimbursement;
    if (formValues) {
      expense = {
        id: this.reimbursementDetail.id,
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

export interface EditReimbursementForm {
  account: number;
  description: string;
  amount: string;
  category: number;
  subcategory: number;
  date: string;
}
