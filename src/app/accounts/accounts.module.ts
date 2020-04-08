import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountsPageRoutingModule } from './accounts-routing.module';

import { AccountsPage } from './accounts.page';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { EditAccountModalComponent } from './edit-account-modal/edit-account-modal.component';
import { AccountActionsMenuComponent } from './account-actions-menu/account-actions-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountsPage,
    AccountSummaryComponent,
    CreateAccountModalComponent,
    EditAccountModalComponent,
    AccountActionsMenuComponent
  ],
  entryComponents: [
    CreateAccountModalComponent,
    EditAccountModalComponent,
    AccountActionsMenuComponent
  ]
})
export class AccountsPageModule {}
