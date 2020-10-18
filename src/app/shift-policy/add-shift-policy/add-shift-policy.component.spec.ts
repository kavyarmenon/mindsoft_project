import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShiftPolicyComponent } from './add-shift-policy.component';

describe('AddShiftPolicyComponent', () => {
  let component: AddShiftPolicyComponent;
  let fixture: ComponentFixture<AddShiftPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShiftPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShiftPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
