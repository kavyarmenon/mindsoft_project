import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddWorkPolicyComponent } from "./add-work-policy/add-work-policy.component";

const routes: Routes = [
  {
    path: "add-work-policy",
    component: AddWorkPolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkPolicyRoutingModule {}
