import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOvertimePolicyComponent } from './add-overtime-policy.component';

describe('AddOvertimePolicyComponent', () => {
  let component: AddOvertimePolicyComponent;
  let fixture: ComponentFixture<AddOvertimePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOvertimePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOvertimePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
