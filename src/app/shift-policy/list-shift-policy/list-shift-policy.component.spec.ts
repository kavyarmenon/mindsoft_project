import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShiftPolicyComponent } from './list-shift-policy.component';

describe('ListShiftPolicyComponent', () => {
  let component: ListShiftPolicyComponent;
  let fixture: ComponentFixture<ListShiftPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListShiftPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListShiftPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
