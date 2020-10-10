import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CompanyInformationComponent } from "./company-information/company-information.component";
import { CompanyInfoListComponent } from "./company-info-list/company-info-list.component";
import { CompanyInfoEditComponent } from "./company-info-edit/company-info-edit.component";

const routes: Routes = [
  {
    path: "company-info",
    component: CompanyInformationComponent,
  },
  {
    path: "company-info-list",
    component: CompanyInfoListComponent,
  }, 
  {
    path: "company-info-edit",
    component: CompanyInfoEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralSettingRoutingModule {}
