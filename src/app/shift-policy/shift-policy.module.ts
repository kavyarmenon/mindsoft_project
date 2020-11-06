import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
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
import { ShiftPolicyRoutingModule } from "./shift-policy-routing.module";
import { AddShiftPolicyComponent } from "./add-shift-policy/add-shift-policy.component";
import { ListShiftPolicyComponent } from "./list-shift-policy/list-shift-policy.component";
import { EditShiftPolicyComponent } from "./edit-shift-policy/edit-shift-policy.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AddShiftPolicyComponent,
    ListShiftPolicyComponent,
    EditShiftPolicyComponent,
  ],
  imports: [
    CommonModule,
    ShiftPolicyRoutingModule,
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
    NgbModule,
  ],
})
export class ShiftPolicyModule {}
