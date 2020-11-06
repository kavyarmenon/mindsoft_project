import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DeductionPolicyRoutingModule } from "./deduction-policy-routing.module";
import { AddDeductionPolicyComponent } from "./add-deduction-policy/add-deduction-policy.component";
import { ListDeductionPolicyComponent } from "./list-deduction-policy/list-deduction-policy.component";
import { EditDeductionPolicyComponent } from "./edit-deduction-policy/edit-deduction-policy.component";
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
import { SharedModule } from "./../shared/shared.module";
import { MatIconModule } from "@angular/material/icon";
@NgModule({
  declarations: [
    AddDeductionPolicyComponent,
    ListDeductionPolicyComponent,
    EditDeductionPolicyComponent,
  ],
  imports: [
    CommonModule,
    DeductionPolicyRoutingModule,
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
    SharedModule,
  ],
})
export class DeductionPolicyModule {}
