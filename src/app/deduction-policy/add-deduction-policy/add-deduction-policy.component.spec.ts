import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeductionPolicyComponent } from './add-deduction-policy.component';

describe('AddDeductionPolicyComponent', () => {
  let component: AddDeductionPolicyComponent;
  let fixture: ComponentFixture<AddDeductionPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeductionPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeductionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
