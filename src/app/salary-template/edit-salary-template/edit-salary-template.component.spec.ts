import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalaryTemplateComponent } from './edit-salary-template.component';

describe('EditSalaryTemplateComponent', () => {
  let component: EditSalaryTemplateComponent;
  let fixture: ComponentFixture<EditSalaryTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalaryTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalaryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
