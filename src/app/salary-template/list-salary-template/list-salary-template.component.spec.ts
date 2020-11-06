import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalaryTemplateComponent } from './list-salary-template.component';

describe('ListSalaryTemplateComponent', () => {
  let component: ListSalaryTemplateComponent;
  let fixture: ComponentFixture<ListSalaryTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSalaryTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSalaryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
