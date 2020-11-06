import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddWorkPolicyComponent } from "./add-work-policy/add-work-policy.component";
import { EditWorkPolicyComponent } from "./edit-work-policy/edit-work-policy.component";
import { ListWorkPolicyComponent } from "./list-work-policy/list-work-policy.component";

const routes: Routes = [
  {
    path: "add-work-policy",
    component: AddWorkPolicyComponent,
  },
  {
    path: "list-work-policy",
    component: ListWorkPolicyComponent,
  },
  {
    path: "edit-work-policy",
    component: EditWorkPolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkPolicyRoutingModule {}
