import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPfPolicyComponent } from './add-pf-policy.component';

describe('AddPfPolicyComponent', () => {
  let component: AddPfPolicyComponent;
  let fixture: ComponentFixture<AddPfPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPfPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPfPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
