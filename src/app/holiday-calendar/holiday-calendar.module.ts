import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HolidayCalendarRoutingModule } from "./holiday-calendar-routing.module";
import { CalendarContainerComponent } from "./calendar-container/calendar-container.component";
import { FormsModule } from "@angular/forms";
import { FlatpickrModule } from "angularx-flatpickr";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
@NgModule({
  declarations: [CalendarContainerComponent],
  exports: [CalendarContainerComponent],
  imports: [
    CommonModule,
    HolidayCalendarRoutingModule,
    FormsModule,
    NgbModalModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class HolidayCalendarModule {}
