import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EncashPolicyRoutingModule } from "./encash-policy-routing.module";
import { AddEncashPolicyComponent } from "./add-encash-policy/add-encash-policy.component";
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
import { ListEncashPolicyComponent } from './list-encash-policy/list-encash-policy.component';
import { EditEncashPolicyComponent } from './edit-encash-policy/edit-encash-policy.component';

@NgModule({
  declarations: [AddEncashPolicyComponent, ListEncashPolicyComponent, EditEncashPolicyComponent],
  imports: [
    CommonModule,
    EncashPolicyRoutingModule,
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
  ],
})
export class EncashPolicyModule {}
