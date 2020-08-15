import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${environment.apiUrl}/expenses`);
  }

  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(`${environment.apiUrl}/expenses/${id}`);
  }

  createExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${environment.apiUrl}/expenses`, expense);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${environment.apiUrl}/expenses/${expense.id}`, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/expenses/${id}`);
  }

  getExpenseDetails(): Observable<ExpenseDetail[]> {
    return this.http.get<ExpenseDetail[]>(`${environment.apiUrl}/expenses/details`);
  }

  getExpenseDetailById(id: number): Observable<ExpenseDetail> {
    return this.http.get<ExpenseDetail>(`${environment.apiUrl}/expenses/details/${id}`);
  }

  createTransfer(transfer: ClientTransfer): Observable<TransferLink> {
    return this.http.post<TransferLink>(`${environment.apiUrl}/transfer`, transfer);
  }

  getReimbursements(): Observable<Reimbursement[]> {
    return this.http.get<Reimbursement[]>(`${environment.apiUrl}/reimbursements`);
  }

  getReimbursementById(id: number): Observable<Reimbursement> {
    return this.http.get<Reimbursement>(`${environment.apiUrl}/reimbursements/${id}`);
  }

  createReimbursement(reimbursement: Reimbursement): Observable<Reimbursement> {
    return this.http.post<Reimbursement>(`${environment.apiUrl}/reimbursements`, reimbursement);
  }

  updateReimbursement(reimbursement: Reimbursement): Observable<Reimbursement> {
    return this.http.put<Reimbursement>(`${environment.apiUrl}/reimbursements/${reimbursement.id}`, reimbursement);
  }

  deleteReimbursement(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/reimbursements/${id}`);
  }
}

export interface Expense {
  id?: number;
  description: string;
  amount: number;
  expenseCategoryId: number;
  expenseSubcategoryId?: number;
  accountId: number;
  createDate: string;
  modifyDate?: string;
}

export interface ExpenseDetail extends Expense {
  accountName: string;
  expenseCategoryName: string;
  expenseSubcategoryName: string;
}

export interface ClientTransfer {
  id?: number;
  sourceAccountId: number;
  destinationAccountId?: number;
  incomeCategoryId?: number;
  amount: number;
  createDate?: string;
}

export interface TransferLink {
  id?: number;
  sourceAccountId: number;
  destinationAccountId: number;
  createDate?: string;
  modifyDate?: string;
}

export interface Reimbursement {
  id?: number;
  description: string;
  amount: number;
  expenseCategoryId: number;
  expenseSubcategoryId?: number;
  accountId: number;
  createDate: string;
  modifyDate?: string;
}

export interface ReimbursementDetail extends Reimbursement {
  accountName: string;
  expenseCategoryName: string;
  expenseSubcategoryName: string;
}
