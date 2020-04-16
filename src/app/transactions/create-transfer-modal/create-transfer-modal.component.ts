import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountsService, Account } from 'src/app/services/accounts.service';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ClientTransfer } from 'src/app/services/transactions.service';

@Component({
  selector: 'create-transfer-modal',
  templateUrl: './create-transfer-modal.component.html',
  styleUrls: ['./create-transfer-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTransferModalComponent implements OnInit {

  accounts$: Observable<Account[]> = this.accountsService.getAccounts();

  transferForm: FormGroup = this.fb.group({
    sourceAccountId: ['', Validators.required],
    destinationAccountId: ['', Validators.required],
    amount: ['', Validators.required],
    createDate: new Date().toUTCString()
  });

  constructor(
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  dismissModal(formValues: CreateTransferForm): void {
    let clientTransfer: ClientTransfer;
    if (formValues) {
      clientTransfer = {
        sourceAccountId: formValues.sourceAccountId,
        destinationAccountId: formValues.destinationAccountId,
        amount: parseFloat(formValues.amount),
        createDate: formValues.createDate
      };
    }
    this.modalController.dismiss(clientTransfer);
  }

}

export interface CreateTransferForm {
  sourceAccountId: number;
  destinationAccountId: number;
  amount: string;
  createDate: string;
}
