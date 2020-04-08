import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AccountType, Account, AccountsService } from 'src/app/services/accounts.service';
import { Validators, FormBuilder } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-edit-account-modal',
  templateUrl: './edit-account-modal.component.html',
  styleUrls: ['./edit-account-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditAccountModalComponent implements OnInit {

  accountTypes: AccountType[];

  accountForm = this.fb.group({
    name: ['', Validators.required],
    type: [null, Validators.required],
    startingBalance: ''
  });

  get accountType(): string { return this.accountForm.get('type').value; }
  get startingBalanceValue(): string { return this.accountForm.get('startingBalance').value; }

  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private navParams: NavParams,
    private accountService: AccountsService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.accountService.getAccountTypes().subscribe((accountTypes) => {

      this.accountTypes = accountTypes;

      const { name, accountTypeId, startingBalance } = this.navParams.data;

      setTimeout(() => {
        this.accountForm.patchValue({
          name,
          type: accountTypeId,
          startingBalance
        });
      }, 0);

      this.cdr.markForCheck();
    });
  }

  dismissModal(formValues: EditAccountModal): void {
    let account: Account;
    if (formValues) {
      account = {
        id: this.navParams.data.id,
        name: formValues.name,
        accountTypeId: formValues.type,
        startingBalance: parseFloat(formValues.startingBalance) ? parseFloat(formValues.startingBalance) : 0
      };
    }

    this.modalController.dismiss(account);
  }

}

export interface EditAccountModal {
  name: string;
  type: number;
  startingBalance: string;
}
