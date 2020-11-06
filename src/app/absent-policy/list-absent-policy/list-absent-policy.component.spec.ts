import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAbsentPolicyComponent } from './list-absent-policy.component';

describe('ListAbsentPolicyComponent', () => {
  let component: ListAbsentPolicyComponent;
  let fixture: ComponentFixture<ListAbsentPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAbsentPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAbsentPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
