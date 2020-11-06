import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbsentPolicyComponent } from './edit-absent-policy.component';

describe('EditAbsentPolicyComponent', () => {
  let component: EditAbsentPolicyComponent;
  let fixture: ComponentFixture<EditAbsentPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAbsentPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAbsentPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
