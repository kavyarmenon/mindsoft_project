import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOvertimePolicyComponent } from './edit-overtime-policy.component';

describe('EditOvertimePolicyComponent', () => {
  let component: EditOvertimePolicyComponent;
  let fixture: ComponentFixture<EditOvertimePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOvertimePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOvertimePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
