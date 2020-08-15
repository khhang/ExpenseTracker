import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateWithdrawalModalComponent } from './create-withdrawal-modal.component';

describe('CreateWithdrawalModalComponent', () => {
  let component: CreateWithdrawalModalComponent;
  let fixture: ComponentFixture<CreateWithdrawalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWithdrawalModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateWithdrawalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
