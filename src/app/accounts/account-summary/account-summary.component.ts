import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AccountDetail } from 'src/app/services/accounts.service';
import { PopoverController } from '@ionic/angular';
import { AccountActionsMenuComponent, AccountAction } from '../account-actions-menu/account-actions-menu.component';

@Component({
  selector: 'account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountSummaryComponent implements OnInit {

  @Input() accountDetails: AccountDetail[];
  @Output() editButtonClicked = new EventEmitter<AccountDetail>();
  @Output() deleteButtonClicked = new EventEmitter<AccountDetail>();

  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit(): void {}

  getTotalBalance(): number {
    let total = 0;

    if (this.accountDetails) {
      this.accountDetails.forEach((accountDetail) => {
        total += accountDetail.currentBalance;
      });
    }

    return total;
  }

  async openActionsMenu(e: any, data: AccountDetail) {
    const popover = await this.popoverController.create({
      component: AccountActionsMenuComponent,
      event: e,
      showBackdrop: false,
      componentProps: data
    });

    await popover.present();

    await popover.onWillDismiss()
      .then(result => {
        if (result.data) {
          const { action, accountDetail } = result.data;

          switch(action.id) {
            case AccountAction.EDIT:
              this.editButtonClicked.emit(accountDetail);
              break;
            case AccountAction.DELETE:
              this.deleteButtonClicked.emit(accountDetail);
              break;
            default:
              break;
          }
        }
      });
  }

}
