import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditReimbursementModalComponent } from './edit-reimbursement-modal.component';

describe('EditReimbursementModalComponent', () => {
  let component: EditReimbursementModalComponent;
  let fixture: ComponentFixture<EditReimbursementModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReimbursementModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditReimbursementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
