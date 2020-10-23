import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProffesionalTaxPolicyComponent } from './add-proffesional-tax-policy.component';

describe('AddProffesionalTaxPolicyComponent', () => {
  let component: AddProffesionalTaxPolicyComponent;
  let fixture: ComponentFixture<AddProffesionalTaxPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProffesionalTaxPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProffesionalTaxPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
