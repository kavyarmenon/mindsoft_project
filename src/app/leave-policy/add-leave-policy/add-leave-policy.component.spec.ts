import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeavePolicyComponent } from './add-leave-policy.component';

describe('AddLeavePolicyComponent', () => {
  let component: AddLeavePolicyComponent;
  let fixture: ComponentFixture<AddLeavePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeavePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeavePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
