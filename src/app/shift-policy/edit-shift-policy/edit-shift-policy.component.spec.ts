import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditShiftPolicyComponent } from './edit-shift-policy.component';

describe('EditShiftPolicyComponent', () => {
  let component: EditShiftPolicyComponent;
  let fixture: ComponentFixture<EditShiftPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditShiftPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditShiftPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
