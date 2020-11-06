import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbsentPolicyComponent } from './add-absent-policy.component';

describe('AddAbsentPolicyComponent', () => {
  let component: AddAbsentPolicyComponent;
  let fixture: ComponentFixture<AddAbsentPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAbsentPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbsentPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
