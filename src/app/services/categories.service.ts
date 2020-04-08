import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

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