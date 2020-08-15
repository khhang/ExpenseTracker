import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { AccountsService, Account } from 'src/app/services/accounts.service';
import { ClientTransfer } from 'src/app/services/transactions.service';

@Component({
  selector: 'create-withdrawal-modal',
  templateUrl: './create-withdrawal-modal.component.html',
  styleUrls: ['./create-withdrawal-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateWithdrawalModalComponent implements OnInit {

  withdrawalForm: FormGroup = this.fb.group({
    accountId: ['', Validators.required],
    amount: ['', Validators.required],
    createDate: new Date().toUTCString()
  });

  accounts$: Observable<Account[]> = this.accountService.getAccounts();

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private accountService: AccountsService
  ) { }

  ngOnInit() {}

  dismissModal(formValues: CreateWithdrawalForm): void {
    let withdrawal: ClientTransfer;
    if (formValues) {
      withdrawal = {
        sourceAccountId: formValues.accountId,
        amount: parseFloat(formValues.amount) ? -parseFloat(formValues.amount) : 0,
        createDate: formValues.createDate
      };
    }

    this.modalController.dismiss(withdrawal);
  }

}

export interface CreateWithdrawalForm {
  accountId: number;
  amount: string;
  category: number;
  createDate: string;
}
