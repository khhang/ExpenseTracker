import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  refresh$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  expenseCategories$: Observable<ExpenseCategory[]> = this.refresh$.pipe(
    switchMap(() => this.getCategories())
  );
  expenseSubcategories$: Observable<ExpenseSubcategory[]> = this.refresh$.pipe(
    switchMap(() => this.getSubcategories())
  );
  incomeCategories$: Observable<IncomeCategory[]> = this.refresh$.pipe(
    switchMap(() => this.getIncomeCategories())
  );

  constructor(private http: HttpClient) { }

  getCategories(): Observable<ExpenseCategory[]> {
    return this.http.get<ExpenseCategory[]>(`${environment.apiUrl}/expenseCategories`);
  }

  getCategoryById(id: number): Observable<ExpenseCategory> {
    return this.http.get<ExpenseCategory>(`${environment.apiUrl}/expenseCategories/${id}`);
  }

  createCategory(expenseCategory: ExpenseCategory): Observable<ExpenseCategory> {
    return this.http.post<ExpenseCategory>(`${environment.apiUrl}/expenseCategories`, expenseCategory);
  }

  updateCategory(expenseCategory: ExpenseCategory): Observable<ExpenseCategory> {
    return this.http.put<ExpenseCategory>(`${environment.apiUrl}/expenseCategories/${expenseCategory.id}`, expenseCategory);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/expenseCategories/${id}`);
  }

  getSubcategories(): Observable<ExpenseSubcategory[]> {
    return this.http.get<ExpenseSubcategory[]>(`${environment.apiUrl}/expenseSubcategories`);
  }

  getSubcategoryById(id: number): Observable<ExpenseSubcategory> {
    return this.http.get<ExpenseSubcategory>(`${environment.apiUrl}/expenseSubcategories/${id}`);
  }

  createSubcategory(expenseSubcategory: ExpenseSubcategory): Observable<ExpenseSubcategory> {
    return this.http.post<ExpenseSubcategory>(`${environment.apiUrl}/expenseSubcategories`, expenseSubcategory);
  }

  updateSubcategory(expenseSubcategory: ExpenseSubcategory): Observable<ExpenseSubcategory> {
    return this.http.put<ExpenseSubcategory>(`${environment.apiUrl}/expenseSubcategories/${expenseSubcategory.id}`, expenseSubcategory);
  }

  deleteSubcategory(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/expenseSubcategories/${id}`);
  }

  getIncomeCategories(): Observable<IncomeCategory[]> {
    return this.http.get<IncomeCategory[]>(`${environment.apiUrl}/incomeCategories`);
  }

  getIncomeCategoryById(id: number): Observable<IncomeCategory> {
    return this.http.get<IncomeCategory>(`${environment.apiUrl}/incomeCategories/${id}`);
  }

  createIncomeCategory(incomeCategory: IncomeCategory): Observable<IncomeCategory> {
    return this.http.post<IncomeCategory>(`${environment.apiUrl}/incomeCategories`, incomeCategory);
  }

  updateIncomeCategory(incomeCategory: IncomeCategory): Observable<IncomeCategory> {
    return this.http.put<IncomeCategory>(`${environment.apiUrl}/incomeCategories/${incomeCategory.id}`, incomeCategory);
  }

  deleteIncomeCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/incomeCategories/${id}`);
  }

}

export interface IncomeCategory {
  id?: number;
  name: string;
}

export interface ExpenseCategory {
  id?: number;
  name: string;
}

export interface ExpenseSubcategory {
  id?: number;
  name: string;
  categoryId: number;
}