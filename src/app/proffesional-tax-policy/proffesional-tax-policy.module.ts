import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProffesionalTaxPolicyRoutingModule } from "./proffesional-tax-policy-routing.module";
import { AddProffesionalTaxPolicyComponent } from "./add-proffesional-tax-policy/add-proffesional-tax-policy.component";
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
  declarations: [AddProffesionalTaxPolicyComponent],
  imports: [
    CommonModule,
    ProffesionalTaxPolicyRoutingModule,
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
export class ProffesionalTaxPolicyModule {}
