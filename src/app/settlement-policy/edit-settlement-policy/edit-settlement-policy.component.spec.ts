import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSettlementPolicyComponent } from './edit-settlement-policy.component';

describe('EditSettlementPolicyComponent', () => {
  let component: EditSettlementPolicyComponent;
  let fixture: ComponentFixture<EditSettlementPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSettlementPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSettlementPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
