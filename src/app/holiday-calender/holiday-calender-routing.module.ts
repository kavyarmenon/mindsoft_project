import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HolidayCalenderContainerComponent } from "./holiday-calender-container/holiday-calender-container.component";

const routes: Routes = [
  {
    path: "holiday-calendar",
    component: HolidayCalenderContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidayCalenderRoutingModule {}
