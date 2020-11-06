import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddHolidayPolicyComponent } from "./add-holiday-policy/add-holiday-policy.component";
import { EditHolidayPolicyComponent } from "./edit-holiday-policy/edit-holiday-policy.component";
import { ListHolidayPolicyComponent } from "./list-holiday-policy/list-holiday-policy.component";

const routes: Routes = [
  {
    path: "add-holiday-policy",
    component: AddHolidayPolicyComponent,
  },
  {
    path: "list-holiday-policy",
    component: ListHolidayPolicyComponent,
  },
  {
    path: "edit-holiday-policy",
    component: EditHolidayPolicyComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HolidayPolicyRoutingModule {}
