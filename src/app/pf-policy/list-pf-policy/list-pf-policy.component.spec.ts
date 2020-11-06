import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPfPolicyComponent } from './list-pf-policy.component';

describe('ListPfPolicyComponent', () => {
  let component: ListPfPolicyComponent;
  let fixture: ComponentFixture<ListPfPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPfPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPfPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
