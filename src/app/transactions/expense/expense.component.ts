import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ExpenseDetail } from 'src/app/services/transactions.service';
import { ExpenseActionsMenuComponent, ExpenseAction } from '../expense-actions-menu/expense-actions-menu.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {

  @Input() expenseDetail: ExpenseDetail;

  @Output() editExpense: EventEmitter<ExpenseDetail> = new EventEmitter<ExpenseDetail>();
  @Output() deleteExpense: EventEmitter<ExpenseDetail> = new EventEmitter<ExpenseDetail>();

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  async openActionsMenu(e: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: ExpenseActionsMenuComponent,
      event: e,
      showBackdrop: false
    });

    await popover.present();

    await popover.onWillDismiss()
      .then(result => {
        if (result.data) {
          const action = result.data;

          switch (action.id) {
            case ExpenseAction.EDIT_EXPENSE:
              this.editExpense.emit(this.expenseDetail);
              break;
            case ExpenseAction.DELETE_EXPENSE:
              this.deleteExpense.emit(this.expenseDetail);
          }
        }
      });
  }

}
