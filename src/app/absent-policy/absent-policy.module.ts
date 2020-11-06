import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AbsentPolicyRoutingModule } from "./absent-policy-routing.module";
import { AddAbsentPolicyComponent } from "./add-absent-policy/add-absent-policy.component";
import { ListAbsentPolicyComponent } from "./list-absent-policy/list-absent-policy.component";
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
import { MatTabsModule } from "@angular/material/tabs";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EditAbsentPolicyComponent } from './edit-absent-policy/edit-absent-policy.component';

@NgModule({
  declarations: [AddAbsentPolicyComponent, ListAbsentPolicyComponent, EditAbsentPolicyComponent],
  imports: [
    CommonModule,
    AbsentPolicyRoutingModule,
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
    MatTabsModule,
    NgbModule,
  ],
})
export class AbsentPolicyModule {}
