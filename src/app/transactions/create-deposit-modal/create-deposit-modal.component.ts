import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AccountsService, Account } from 'src/app/services/accounts.service';
import { Observable } from 'rxjs/internal/Observable';
import { CategoriesService, IncomeCategory } from 'src/app/services/categories.service';
import { ClientTransfer } from 'src/app/services/transactions.service';

@Component({
  selector: 'create-deposit-modal',
  templateUrl: './create-deposit-modal.component.html',
  styleUrls: ['./create-deposit-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateDepositModalComponent implements OnInit {

  depositForm: FormGroup = this.fb.group({
    accountId: ['', Validators.required],
    amount: ['', Validators.required],
    category: null,
    createDate: new Date().toUTCString()
  });

  accounts$: Observable<Account[]> = this.accountService.getAccounts();
  incomeCategories$: Observable<IncomeCategory[]> = this.categoriesService.getIncomeCategories();

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private accountService: AccountsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {}

  dismissModal(formValues: CreateDepositForm): void {
    let deposit: ClientTransfer;
    if (formValues) {
      deposit = {
        sourceAccountId: formValues.accountId,
        amount: parseFloat(formValues.amount) ? parseFloat(formValues.amount) : 0,
        incomeCategoryId: formValues.category,
        createDate: formValues.createDate
      };
    }

    this.modalController.dismiss(deposit);
  }

}

export interface CreateDepositForm {
  accountId: number;
  amount: string;
  category: number;
  createDate: string;
}
