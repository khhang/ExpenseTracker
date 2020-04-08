import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-account-actions-menu',
  templateUrl: './account-actions-menu.component.html',
  styleUrls: ['./account-actions-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountActionsMenuComponent implements OnInit {

  actions: AccountMenuItem[] = [
    { id: AccountAction.EDIT , label: 'Edit' },
    { id: AccountAction.DELETE, label: 'Delete' }
  ];

  constructor(
    private popoverController: PopoverController,
    private navParams: NavParams
  ) { }

  ngOnInit() {}

  dismissPopover(action: AccountMenuItem): void {
    this.popoverController.dismiss(action ? {
      action,
      accountDetail: this.navParams.data
    } : null);
  }

}

export interface AccountMenuItem {
  id: number;
  label: string;
}

export enum AccountAction {
  EDIT,
  DELETE
}
