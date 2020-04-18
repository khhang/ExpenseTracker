import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ExpenseDetail, TransactionsService } from '../services/transactions.service';
import { PopoverController, ModalController, AlertController } from '@ionic/angular';
import { TransactionsActionsMenuComponent, TransactionAction } from './transactions-actions-menu/transactions-actions-menu.component';
import { CreateExpenseModalComponent } from './create-expense-modal/create-expense-modal.component';
import { switchMap, map } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { EditExpenseModalComponent } from './edit-expense-modal/edit-expense-modal.component';
import { CreateTransferModalComponent } from './create-transfer-modal/create-transfer-modal.component';
import { CreateReimbursementModalComponent } from './create-reimbursement-modal/create-reimbursement-modal.component';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsPage implements OnInit {
  transactions: TransactionByDate[];
  refresh$: BehaviorSubject<undefined> = new BehaviorSubject<undefined>(undefined);
  transactions$: Observable<TransactionByDate[]> = this.refresh$.pipe(
    switchMap(() => this.transactionService.getExpenseDetails()),
    map((expenseDetails) => {
      const dateGroupedDetails = {};

      expenseDetails.forEach(ed => {
        const date = ed.createDate.slice(0, 10);
        if (dateGroupedDetails[date]) {
          dateGroupedDetails[date].push(ed);
        } else {
          dateGroupedDetails[date] = [ed];
        }
      });

      return this.buildTransactionsByDate(dateGroupedDetails);
    })
  );
  title = 'Transactions';

  constructor(
    private transactionService: TransactionsService,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private toastService: ToastService,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  buildTransactionsByDate(dateGroupedDetails: any): TransactionByDate[] {
    const results = [];

    Object.keys(dateGroupedDetails).forEach((key: string) => {
      const expenseDetailsByDate = {
        date: key,
        data: dateGroupedDetails[key]
      };

      results.push(expenseDetailsByDate);
    });

    return results.sort((a, b) => b.date.localeCompare(a.date));
  }

  async openCreateExpenseModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateExpenseModalComponent
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

  async openCreateTransferModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateTransferModalComponent
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(newTransfer => {
        if (newTransfer.data) {
          this.transactionService.createTransfer(newTransfer.data).subscribe(() => {
            this.refresh$.next(undefined);
            this.toastService.presentToast('Created a new transfer');
          });
        }
      });
  }

  async openCreateReimbursementModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateReimbursementModalComponent
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(newReimbursement => {
        if (newReimbursement.data) {
          this.transactionService.createReimbursement(newReimbursement.data).subscribe(() => {
            this.refresh$.next(undefined);
            this.toastService.presentToast('Created a new reimbursement');
          })
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
              this.openCreateExpenseModal();
              break;
            case TransactionAction.CREATE_REIMBURSEMENT:
              this.openCreateReimbursementModal();
              break;
            case TransactionAction.CREATE_TRANSFER:
              this.openCreateTransferModal();
              break;
            default:
              break;
          }
        }
      });
  }

  async openDeleteExpenseConfirmation(expenseDetail: ExpenseDetail): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Expense',
      message: `Are you sure you want to delete the expense: ${expenseDetail.description}?`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.transactionService.deleteExpense(expenseDetail.id).subscribe(() => {
              this.refresh$.next(undefined);
              this.toastService.presentToast('Deleted an expense');
            });
          }
        },
        {
          text: 'Cancel',
          cssClass: 'secondary'
        }
      ]
    });

    await alert.present();
  }

}

export interface TransactionByDate {
  date: string;
  data: any[];
}
