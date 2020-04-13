import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'expense-actions-menu',
  templateUrl: './expense-actions-menu.component.html',
  styleUrls: ['./expense-actions-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpenseActionsMenuComponent implements OnInit {

  actions: ExpenseMenuItem[] = [
    { id: ExpenseAction.EDIT_EXPENSE, label: 'Edit' },
    { id: ExpenseAction.DELETE_EXPENSE, label: 'Delete'}
  ];

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  dismissPopover(action: ExpenseMenuItem): void {
    this.popoverController.dismiss(action);
  }

}

export interface ExpenseMenuItem {
  id: number;
  label: string;
}

export enum ExpenseAction {
  EDIT_EXPENSE,
  DELETE_EXPENSE
}
