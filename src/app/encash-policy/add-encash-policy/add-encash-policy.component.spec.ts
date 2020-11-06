import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEncashPolicyComponent } from './add-encash-policy.component';

describe('AddEncashPolicyComponent', () => {
  let component: AddEncashPolicyComponent;
  let fixture: ComponentFixture<AddEncashPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEncashPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEncashPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
