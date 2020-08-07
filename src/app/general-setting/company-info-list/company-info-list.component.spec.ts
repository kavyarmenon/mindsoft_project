import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoListComponent } from './company-info-list.component';

describe('CompanyInfoListComponent', () => {
  let component: CompanyInfoListComponent;
  let fixture: ComponentFixture<CompanyInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
