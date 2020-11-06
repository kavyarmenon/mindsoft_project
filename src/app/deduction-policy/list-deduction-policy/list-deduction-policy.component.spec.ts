import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeductionPolicyComponent } from './list-deduction-policy.component';

describe('ListDeductionPolicyComponent', () => {
  let component: ListDeductionPolicyComponent;
  let fixture: ComponentFixture<ListDeductionPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDeductionPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDeductionPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
