import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'transactions-actions-menu',
  templateUrl: './transactions-actions-menu.component.html',
  styleUrls: ['./transactions-actions-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsActionsMenuComponent implements OnInit {

  actions: TransactionMenuItem[] = [
    { id: TransactionAction.CREATE_EXPENSE, label: 'Add an Expense' },
    { id: TransactionAction.CREATE_CONTRAEXPENSE, label: 'Add a Contraexpense'},
    { id: TransactionAction.CREATE_TRANSFER, label: 'Create a Transfer ' },
    { id: TransactionAction.CREATE_DEPOSIT, label: 'Create a Deposit' },
    { id: TransactionAction.CREATE_WITHDRAWAL, label: 'Create a Withdrawal'}
  ];

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  dismissPopover(action: TransactionMenuItem): void {
    this.popoverController.dismiss(action);
  }

}

export interface TransactionMenuItem {
  id: number;
  label: string;
}

export enum TransactionAction {
  CREATE_TRANSFER,
  CREATE_EXPENSE,
  CREATE_CONTRAEXPENSE,
  CREATE_DEPOSIT,
  CREATE_WITHDRAWAL
}
