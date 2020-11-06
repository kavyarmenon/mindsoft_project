import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayCalenderContainerComponent } from './holiday-calender-container.component';

describe('HolidayCalenderContainerComponent', () => {
  let component: HolidayCalenderContainerComponent;
  let fixture: ComponentFixture<HolidayCalenderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayCalenderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayCalenderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
