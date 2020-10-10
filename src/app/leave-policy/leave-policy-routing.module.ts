import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddLeavePolicyComponent } from "./add-leave-policy/add-leave-policy.component";
import { EditLeavePolicyComponent } from "./edit-leave-policy/edit-leave-policy.component";
import { ListLeavePolicyComponent } from "./list-leave-policy/list-leave-policy.component";

const routes: Routes = [
  {
    path: "add-leave-policy",
    component: AddLeavePolicyComponent,
  },
  {
    path: "list-leave-policy",
    component: ListLeavePolicyComponent,
  },
  {
    path: "edit-leave-policy",
    component: EditLeavePolicyComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeavePolicyRoutingModule {}
