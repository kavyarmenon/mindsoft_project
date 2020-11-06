import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEncashPolicyComponent } from './list-encash-policy.component';

describe('ListEncashPolicyComponent', () => {
  let component: ListEncashPolicyComponent;
  let fixture: ComponentFixture<ListEncashPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEncashPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEncashPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
