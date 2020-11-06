import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SalaryTemplateRoutingModule } from "./salary-template-routing.module";
import { AddSalaryTemplateComponent } from "./add-salary-template/add-salary-template.component";
import { ListSalaryTemplateComponent } from "./list-salary-template/list-salary-template.component";
import { EditSalaryTemplateComponent } from "./edit-salary-template/edit-salary-template.component";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
@NgModule({
  declarations: [
    AddSalaryTemplateComponent,
    ListSalaryTemplateComponent,
    EditSalaryTemplateComponent,
  ],
  imports: [
    CommonModule,
    SalaryTemplateRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatStepperModule,
  ],
})
export class SalaryTemplateModule {}
