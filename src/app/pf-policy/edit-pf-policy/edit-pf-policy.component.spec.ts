import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPfPolicyComponent } from './edit-pf-policy.component';

describe('EditPfPolicyComponent', () => {
  let component: EditPfPolicyComponent;
  let fixture: ComponentFixture<EditPfPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPfPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPfPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
