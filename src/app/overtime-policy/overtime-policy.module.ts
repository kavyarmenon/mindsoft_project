import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OvertimePolicyRoutingModule } from "./overtime-policy-routing.module";
import { AddOvertimePolicyComponent } from "./add-overtime-policy/add-overtime-policy.component";
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
import { ListOvertimePolicyComponent } from "./list-overtime-policy/list-overtime-policy.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
@NgModule({
  declarations: [AddOvertimePolicyComponent, ListOvertimePolicyComponent],
  imports: [
    CommonModule,
    OvertimePolicyRoutingModule,
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
    MatIconModule,
    NgbModule,
  ],
})
export class OvertimePolicyModule {}
