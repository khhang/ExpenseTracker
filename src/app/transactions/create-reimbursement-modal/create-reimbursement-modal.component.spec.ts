import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateReimbursementModalComponent } from './create-reimbursement-modal.component';

describe('CreateReimbursementModalComponent', () => {
  let component: CreateReimbursementModalComponent;
  let fixture: ComponentFixture<CreateReimbursementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReimbursementModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateReimbursementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
