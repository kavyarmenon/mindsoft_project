import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEncashPolicyComponent } from "./add-encash-policy/add-encash-policy.component";
import { EditEncashPolicyComponent } from "./edit-encash-policy/edit-encash-policy.component";
import { ListEncashPolicyComponent } from "./list-encash-policy/list-encash-policy.component";

const routes: Routes = [
  {
    path: "add-encash-policy",
    component: AddEncashPolicyComponent,
  },
  {
    path: "list-encash-policy",
    component: ListEncashPolicyComponent,
  },
  {
    path: "edit-encash-policy",
    component: EditEncashPolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncashPolicyRoutingModule {}
