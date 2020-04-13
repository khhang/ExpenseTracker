import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsPageRoutingModule } from './transactions-routing.module';

import { TransactionsPage } from './transactions.page';
import { TransactionsActionsMenuComponent } from './transactions-actions-menu/transactions-actions-menu.component';
import { CreateExpenseModalComponent } from './create-expense-modal/create-expense-modal.component';
import { ExpenseComponent } from './expense/expense.component';
import { ExpenseActionsMenuComponent } from './expense-actions-menu/expense-actions-menu.component';
import { EditExpenseModalComponent } from './edit-expense-modal/edit-expense-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    TransactionsPage,
    TransactionsActionsMenuComponent,
    CreateExpenseModalComponent,
    ExpenseComponent,
    ExpenseActionsMenuComponent,
    EditExpenseModalComponent
  ],
  entryComponents: [
    TransactionsActionsMenuComponent,
    CreateExpenseModalComponent,
    ExpenseActionsMenuComponent,
    EditExpenseModalComponent
  ]
})
export class TransactionsPageModule {}
