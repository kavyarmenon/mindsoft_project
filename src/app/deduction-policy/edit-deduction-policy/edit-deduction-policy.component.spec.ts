import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeductionPolicyComponent } from './edit-deduction-policy.component';

describe('EditDeductionPolicyComponent', () => {
  let component: EditDeductionPolicyComponent;
  let fixture: ComponentFixture<EditDeductionPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeductionPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeductionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
