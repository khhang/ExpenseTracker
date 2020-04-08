import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Account, AccountType, AccountsService } from 'src/app/services/accounts.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountModalComponent implements OnInit {

  accountTypes$: Observable<AccountType[]>;

  accountForm = this.fb.group({
    name: ['', Validators.required],
    type: [null, Validators.required],
    startingBalance: 0
  });

  get accountType(): string { return this.accountForm.get('type').value; }
  get startingBalance(): string { return this.accountForm.get('startingBalance').value; }

  constructor(private fb: FormBuilder, private modalController: ModalController, private accountService: AccountsService) { }

  ngOnInit() {
    this.accountTypes$ = this.accountService.getAccountTypes();
  }

  dismissModal(formValues: CreateAccountFormValues): void {

    let account: Account;
    if (formValues) {
      account = {
        name: formValues.name,
        accountTypeId: formValues.type,
        startingBalance: parseFloat(formValues.startingBalance) ? parseFloat(formValues.startingBalance) : 0
      };
    }

    this.modalController.dismiss(account);
  }

}

export interface CreateAccountFormValues {
  name: string;
  type: number;
  startingBalance: string;
}
