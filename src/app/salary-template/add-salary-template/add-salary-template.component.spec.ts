import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalaryTemplateComponent } from './add-salary-template.component';

describe('AddSalaryTemplateComponent', () => {
  let component: AddSalaryTemplateComponent;
  let fixture: ComponentFixture<AddSalaryTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSalaryTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalaryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
