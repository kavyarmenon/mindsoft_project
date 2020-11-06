import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddOvertimePolicyComponent } from "./add-overtime-policy/add-overtime-policy.component";
import { ListOvertimePolicyComponent } from "./list-overtime-policy/list-overtime-policy.component";

const routes: Routes = [
  {
    path: "add-overtime-policy",
    component: AddOvertimePolicyComponent,
  },
  {
    path: "list-overtime-policy",
    component: ListOvertimePolicyComponent,
  },
  // {
  //   path: "edit-shift-policy",
  //   component: EditShiftPolicyComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OvertimePolicyRoutingModule {}
