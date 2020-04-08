import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-subcategory-actions-menu',
  templateUrl: './subcategory-actions-menu.component.html',
  styleUrls: ['./subcategory-actions-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubcategoryActionsMenuComponent implements OnInit {

  readonly actions: SubcategoryMenuItem[] = [
    { id: SubcategoryAction.EDIT, label: 'Edit' },
    { id: SubcategoryAction.DELETE, label: 'Delete' }
  ];

  constructor(
    private popoverController: PopoverController,
    private navParams: NavParams
  ) { }

  ngOnInit() {}

  dismissPopover(action: SubcategoryMenuItem): void {
    this.popoverController.dismiss(action ? {
      action,
      category: this.navParams.data.category,
      subcategory: this.navParams.data.subcategory
    } : null);
  }

}

export interface SubcategoryMenuItem {
  id: number;
  label: string;
}

export enum SubcategoryAction {
  EDIT,
  DELETE
}
