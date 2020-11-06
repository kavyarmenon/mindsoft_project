import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOvertimePolicyComponent } from './list-overtime-policy.component';

describe('ListOvertimePolicyComponent', () => {
  let component: ListOvertimePolicyComponent;
  let fixture: ComponentFixture<ListOvertimePolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOvertimePolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOvertimePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
