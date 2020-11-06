import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddProffesionalTaxPolicyComponent } from "./add-proffesional-tax-policy/add-proffesional-tax-policy.component";

const routes: Routes = [
  {
    path: "add-proffesional-tax-policy",
    component: AddProffesionalTaxPolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProffesionalTaxPolicyRoutingModule {}
