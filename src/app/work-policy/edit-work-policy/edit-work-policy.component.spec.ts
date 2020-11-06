import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkPolicyComponent } from './edit-work-policy.component';

describe('EditWorkPolicyComponent', () => {
  let component: EditWorkPolicyComponent;
  let fixture: ComponentFixture<EditWorkPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
