import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeavePolicyComponent } from './edit-leave-policy.component';

describe('EditLeavePolicyComponent', () => {
  let component: EditLeavePolicyComponent;
  let fixture: ComponentFixture<EditLeavePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeavePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeavePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
