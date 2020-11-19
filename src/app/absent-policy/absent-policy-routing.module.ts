import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddAbsentPolicyComponent } from "./add-absent-policy/add-absent-policy.component";
import { EditAbsentPolicyComponent } from "./edit-absent-policy/edit-absent-policy.component";
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
  {
    path: "edit-absent-policy",
    component: EditAbsentPolicyComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbsentPolicyRoutingModule {}
