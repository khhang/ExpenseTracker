import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { SubcategoryActionsMenuComponent } from './subcategory-actions-menu/subcategory-actions-menu.component';
import { CreateCategoryModalComponent } from './create-category-modal/create-category-modal.component';
import { EditCategoryModalComponent } from './edit-category-modal/edit-category-modal.component';
import { CreateSubcategoryModalComponent } from './create-subcategory-modal/create-subcategory-modal.component';
import { EditSubcategoryModalComponent } from './edit-subcategory-modal/edit-subcategory-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CategoriesPage,
    CategoryDetailsComponent,
    SubcategoryActionsMenuComponent,
    CreateCategoryModalComponent,
    EditCategoryModalComponent,
    CreateSubcategoryModalComponent,
    EditSubcategoryModalComponent
  ],
  entryComponents: [
    SubcategoryActionsMenuComponent,
    CreateCategoryModalComponent,
    EditCategoryModalComponent,
    CreateSubcategoryModalComponent,
    EditSubcategoryModalComponent
  ]
})
export class CategoriesPageModule {}
