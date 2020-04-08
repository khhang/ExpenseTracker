import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${environment.apiUrl}/accounts`);
  }

  getAccountById(id: number) {
    return this.http.get<Account>(`${environment.apiUrl}/accounts/${id}`);
  }

  getAccountDetails(): Observable<AccountDetail[]> {
    return this.http.get<AccountDetail[]>(`${environment.apiUrl}/accounts/details`);
  }

  getAccountDetailsById(id: number): Observable<AccountDetail> {
    return this.http.get<AccountDetail>(`${environment.apiUrl}/accounts/details/${id}`);
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/accounts/${id}`);
  }

  updateAccount(account: Account): Observable<Account> {
    return this.http.put<Account>(`${environment.apiUrl}/accounts/${account.id}/`, account);
  }

  createAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(`${environment.apiUrl}/accounts/`, account);
  }

  getAccountTypes(): Observable<AccountType[]> {
    return this.http.get<AccountType[]>(`${environment.apiUrl}/accounts/types`);
  }
}

export interface Account {
  id?: number;
  name: string;
  startingBalance: number;
  accountTypeId: number;
}

export interface AccountDetail extends Account {
  accountTypeName: string;
  currentBalance: number;
}

export interface AccountType {
  id?: number;
  name: string;
}
