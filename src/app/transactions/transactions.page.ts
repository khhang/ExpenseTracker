import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ExpenseDetail, TransactionsService } from '../services/transactions.service';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { TransactionsActionsMenuComponent, TransactionAction } from './transactions-actions-menu/transactions-actions-menu.component';
import { CreateExpenseModalComponent } from './create-expense-modal/create-expense-modal.component';
import { switchMap, map } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { EditExpenseModalComponent } from './edit-expense-modal/edit-expense-modal.component';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  dateGroupedDetails: any;
  refresh$: BehaviorSubject<undefined> = new BehaviorSubject<undefined>(undefined);
  expenseDetails$: Observable<ExpenseDetail[]> = this.refresh$.pipe(
    switchMap(() => this.transactionService.getExpenseDetails()),
    map(expenseDetails => {
      const dateGroupedDetails = {};

      expenseDetails.forEach(ed => {
        const date = ed.createDate.slice(0, 10);
        if (dateGroupedDetails[date]) {
          dateGroupedDetails[date].push(ed);
        } else {
          dateGroupedDetails[date] = [ed];
        }
      });

      this.dateGroupedDetails = dateGroupedDetails;

      return expenseDetails;
    })
  );
  title = 'Transactions';

  constructor(
    private transactionService: TransactionsService,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private toastService: ToastService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    // TODO: Clean this mess up if we're grouping by date
    this.transactionService.getExpenseDetails().subscribe((expenseDetails) => {
      const dateGroupedDetails = {};

      expenseDetails.forEach(ed => {
        const date = ed.createDate.slice(0, 10);
        if (dateGroupedDetails[date]) {
          dateGroupedDetails[date].push(ed);
        } else {
          dateGroupedDetails[date] = [ed];
        }
      });

      this.dateGroupedDetails = dateGroupedDetails;
    });
  }

  async openCreateExpenseModal(isExpense: boolean = true) {
    const modal = await this.modalController.create({
      component: CreateExpenseModalComponent,
      componentProps: { isExpense }
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(newExpense => {
        if (newExpense.data) {
          this.transactionService.createExpense(newExpense.data).subscribe(() => {
            this.refresh$.next(undefined);
            this.toastService.presentToast('Successfully added a new expense');
          });
        }
      });
  }

  async openEditExpenseModal(expense: ExpenseDetail): Promise<void> {
    const modal = await this.modalController.create({
      component: EditExpenseModalComponent,
      componentProps: expense,
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(result => {
        if (result.data) {
          this.transactionService.updateExpense(result.data).subscribe(() => {
            this.refresh$.next(undefined);
            this.toastService.presentToast('Edited an expense');
          });
        }
      });
  }

  async openActionsMenu(e: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: TransactionsActionsMenuComponent,
      event: e,
      showBackdrop: false
    });

    await popover.present();

    await popover.onWillDismiss()
      .then(result => {
        if (result.data) {
          const action = result.data;

          switch (action.id) {
            case TransactionAction.CREATE_EXPENSE:
              this.openCreateExpenseModal(true);
              break;
            case TransactionAction.CREATE_CONTRAEXPENSE:
              this.openCreateExpenseModal(false);
          }
        }
      });
  }

}
