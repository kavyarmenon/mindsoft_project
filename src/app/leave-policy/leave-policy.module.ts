import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LeavePolicyRoutingModule } from "./leave-policy-routing.module";
import { AddLeavePolicyComponent } from "./add-leave-policy/add-leave-policy.component";
import { ListLeavePolicyComponent } from "./list-leave-policy/list-leave-policy.component";
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
import { EditLeavePolicyComponent } from './edit-leave-policy/edit-leave-policy.component';

@NgModule({
  declarations: [AddLeavePolicyComponent, ListLeavePolicyComponent, EditLeavePolicyComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    LeavePolicyRoutingModule,
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
export class LeavePolicyModule {}
