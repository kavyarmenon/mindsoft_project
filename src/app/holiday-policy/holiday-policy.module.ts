import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HolidayPolicyRoutingModule } from "./holiday-policy-routing.module";
import { AddHolidayPolicyComponent } from "./add-holiday-policy/add-holiday-policy.component";
import { ListHolidayPolicyComponent } from "./list-holiday-policy/list-holiday-policy.component";
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
import { EditHolidayPolicyComponent } from "./edit-holiday-policy/edit-holiday-policy.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AddHolidayPolicyComponent,
    ListHolidayPolicyComponent,
    EditHolidayPolicyComponent,
  ],
  imports: [
    CommonModule,
    HolidayPolicyRoutingModule,
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
    NgbModule,
  ],
})
export class HolidayPolicyModule {}
