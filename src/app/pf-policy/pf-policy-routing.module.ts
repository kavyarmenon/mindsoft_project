import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddPfPolicyComponent } from "./add-pf-policy/add-pf-policy.component";
import { EditPfPolicyComponent } from "./edit-pf-policy/edit-pf-policy.component";
import { ListPfPolicyComponent } from "./list-pf-policy/list-pf-policy.component";

const routes: Routes = [
  {
    path: "add-pf-policy",
    component: AddPfPolicyComponent,
  },
  {
    path: "list-pf-policy",
    component: ListPfPolicyComponent,
  },
  {
    path: "edit-pf-policy",
    component: EditPfPolicyComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PfPolicyRoutingModule {}
