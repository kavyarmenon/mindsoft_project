import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddShiftPolicyComponent } from "./add-shift-policy/add-shift-policy.component";
import { EditShiftPolicyComponent } from "./edit-shift-policy/edit-shift-policy.component";
import { ListShiftPolicyComponent } from "./list-shift-policy/list-shift-policy.component";

const routes: Routes = [
  {
    path: "add-shift-policy",
    component: AddShiftPolicyComponent,
  },
  {
    path: "list-shift-policy",
    component: ListShiftPolicyComponent,
  },
  {
    path: "edit-shift-policy",
    component: EditShiftPolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftPolicyRoutingModule {}
