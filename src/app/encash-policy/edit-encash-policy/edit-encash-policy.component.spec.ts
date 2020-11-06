import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEncashPolicyComponent } from './edit-encash-policy.component';

describe('EditEncashPolicyComponent', () => {
  let component: EditEncashPolicyComponent;
  let fixture: ComponentFixture<EditEncashPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEncashPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEncashPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
