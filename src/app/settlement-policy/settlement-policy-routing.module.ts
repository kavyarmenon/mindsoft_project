import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddSettlementPolicyComponent } from "./add-settlement-policy/add-settlement-policy.component";
import { EditSettlementPolicyComponent } from "./edit-settlement-policy/edit-settlement-policy.component";
import { ListSettlementPolicyComponent } from "./list-settlement-policy/list-settlement-policy.component";

const routes: Routes = [
  {
    path: "add-settlement-policy",
    component: AddSettlementPolicyComponent,
  },
  {
    path: "list-settlement-policy",
    component: ListSettlementPolicyComponent,
  },
  {
    path: "edit-settlement-policy",
    component: EditSettlementPolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettlementPolicyRoutingModule {}
