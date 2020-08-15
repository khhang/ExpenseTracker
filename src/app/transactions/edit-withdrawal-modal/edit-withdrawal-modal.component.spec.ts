import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditWithdrawalModalComponent } from './edit-withdrawal-modal.component';

describe('EditWithdrawalModalComponent', () => {
  let component: EditWithdrawalModalComponent;
  let fixture: ComponentFixture<EditWithdrawalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWithdrawalModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditWithdrawalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
