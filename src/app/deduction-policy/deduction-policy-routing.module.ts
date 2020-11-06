import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddDeductionPolicyComponent } from "./add-deduction-policy/add-deduction-policy.component";
import { EditDeductionPolicyComponent } from "./edit-deduction-policy/edit-deduction-policy.component";
import { ListDeductionPolicyComponent } from "./list-deduction-policy/list-deduction-policy.component";

const routes: Routes = [
  {
    path: "add-deduction-policy",
    component: AddDeductionPolicyComponent,
  },
  {
    path: "list-deduction-policy",
    component: ListDeductionPolicyComponent,
  },
  {
    path: "edit-deduction-policy",
    component: EditDeductionPolicyComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeductionPolicyRoutingModule {}
