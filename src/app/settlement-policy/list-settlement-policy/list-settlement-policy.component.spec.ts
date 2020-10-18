import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSettlementPolicyComponent } from './list-settlement-policy.component';

describe('ListSettlementPolicyComponent', () => {
  let component: ListSettlementPolicyComponent;
  let fixture: ComponentFixture<ListSettlementPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSettlementPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSettlementPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
