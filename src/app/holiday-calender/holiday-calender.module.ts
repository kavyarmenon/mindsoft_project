import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HolidayCalenderRoutingModule } from "./holiday-calender-routing.module";
import { HolidayCalenderContainerComponent } from "./holiday-calender-container/holiday-calender-container.component";
import { CalenderComponent } from "./calender/calender.component";
import { HolidayDetailsComponent } from "./holiday-details/holiday-details.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    HolidayCalenderContainerComponent,
    CalenderComponent,
    HolidayDetailsComponent,
  ],
  imports: [
    CommonModule,
    HolidayCalenderRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HolidayCalenderModule {}
