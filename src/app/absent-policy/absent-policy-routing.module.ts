import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddAbsentPolicyComponent } from "./add-absent-policy/add-absent-policy.component";
import { ListAbsentPolicyComponent } from "./list-absent-policy/list-absent-policy.component";

const routes: Routes = [
  {
    path: "add-absent-policy",
    component: AddAbsentPolicyComponent,
  },
  {
    path: "list-absent-policy",
    component: ListAbsentPolicyComponent,
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
export class AbsentPolicyRoutingModule {}
