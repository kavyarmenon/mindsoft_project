import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PfPolicyRoutingModule } from "./pf-policy-routing.module";
import { ListPfPolicyComponent } from "./list-pf-policy/list-pf-policy.component";
import { AddPfPolicyComponent } from "./add-pf-policy/add-pf-policy.component";
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
import { EditPfPolicyComponent } from './edit-pf-policy/edit-pf-policy.component';

@NgModule({
  declarations: [ListPfPolicyComponent, AddPfPolicyComponent, EditPfPolicyComponent],
  imports: [
    CommonModule,
    PfPolicyRoutingModule,
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
export class PfPolicyModule {}
