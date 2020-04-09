import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExpenseDetail, TransactionsService } from '../services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  expenseDetails$: Observable<ExpenseDetail[]>;
  title = 'Transactions';

  constructor(
    private transactionService: TransactionsService
  ) { }

  ngOnInit() {
    this.expenseDetails$ = this.transactionService.getExpenseDetails();
  }

}
