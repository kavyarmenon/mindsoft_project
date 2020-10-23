import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkPolicyComponent } from './list-work-policy.component';

describe('ListWorkPolicyComponent', () => {
  let component: ListWorkPolicyComponent;
  let fixture: ComponentFixture<ListWorkPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWorkPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWorkPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
