import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AccountDetail, AccountsService } from '../services/accounts.service';
import { ModalController, PopoverController, AlertController } from '@ionic/angular';
import { CreateAccountModalComponent } from './create-account-modal/create-account-modal.component';
import { switchMap } from 'rxjs/operators';
import { EditAccountModalComponent } from './edit-account-modal/edit-account-modal.component';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsPage implements OnInit {

  title = 'Accounts';
  refresh$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  accountDetails$: Observable<AccountDetail[]> = this.refresh$.pipe(
    switchMap(() => this.accountService.getAccountDetails())
  );

  constructor(
    private accountService: AccountsService,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastService: ToastService
  ) { }

  ngOnInit() {}

  async openCreateModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CreateAccountModalComponent
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(result => {
        if (result.data) {
          this.accountService.createAccount(result.data).subscribe(() => {
            this.refresh$.next(undefined);
            this.toastService.presentToast('Successfully created a new account');
          });
        }
      });
  }

  async openEditModal(accountDetail: AccountDetail): Promise<void> {
    const modal = await this.modalController.create({
      component: EditAccountModalComponent,
      componentProps: accountDetail
    });

    await modal.present();

    await modal.onWillDismiss()
      .then(result => {
        if (result.data) {
          this.accountService.updateAccount(result.data).subscribe(() => {
            this.refresh$.next(undefined);
            this.toastService.presentToast('Successfully edited an account');
          });
        }
      });
  }

  async openDeleteConfirmation(accountDetail: AccountDetail): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Account',
      message: `Are you sure you want to delete the account ${accountDetail.name}`,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.accountService.deleteAccount(accountDetail.id).subscribe(() => {
              this.refresh$.next(undefined);
              this.toastService.presentToast('Removed account');
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
