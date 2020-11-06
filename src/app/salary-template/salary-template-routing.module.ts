import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddSalaryTemplateComponent } from "./add-salary-template/add-salary-template.component";
import { EditSalaryTemplateComponent } from "./edit-salary-template/edit-salary-template.component";
import { ListSalaryTemplateComponent } from "./list-salary-template/list-salary-template.component";

const routes: Routes = [
  {
    path: "add-salary-template",
    component: AddSalaryTemplateComponent,
  },
  {
    path: "list-salary-template",
    component: ListSalaryTemplateComponent,
  },
  {
    path: "edit-salary-template",
    component: EditSalaryTemplateComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryTemplateRoutingModule {}
