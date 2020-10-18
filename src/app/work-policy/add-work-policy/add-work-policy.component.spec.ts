import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkPolicyComponent } from './add-work-policy.component';

describe('AddWorkPolicyComponent', () => {
  let component: AddWorkPolicyComponent;
  let fixture: ComponentFixture<AddWorkPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
