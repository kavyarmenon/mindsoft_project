import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSettlementPolicyComponent } from './add-settlement-policy.component';

describe('AddSettlementPolicyComponent', () => {
  let component: AddSettlementPolicyComponent;
  let fixture: ComponentFixture<AddSettlementPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSettlementPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSettlementPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
