import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories.page';
import { ExpenseCategoriesComponent } from './expense-categories/expense-categories.component';
import { IncomeCategoriesComponent } from './income-categories/income-categories.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage,
    children: [
      { path: '', redirectTo: 'expense' },
      { path: 'expense', component: ExpenseCategoriesComponent },
      { path: 'income', component: IncomeCategoriesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}
