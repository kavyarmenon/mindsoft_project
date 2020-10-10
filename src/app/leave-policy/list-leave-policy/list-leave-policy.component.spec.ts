import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLeavePolicyComponent } from './list-leave-policy.component';

describe('ListLeavePolicyComponent', () => {
  let component: ListLeavePolicyComponent;
  let fixture: ComponentFixture<ListLeavePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLeavePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLeavePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
