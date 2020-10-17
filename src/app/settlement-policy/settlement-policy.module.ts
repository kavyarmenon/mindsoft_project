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
import { MatStepperModule } from "@angular/material/stepper";
import { MatTabsModule } from "@angular/material/tabs";
import { SettlementPolicyRoutingModule } from "./settlement-policy-routing.module";
import { AddSettlementPolicyComponent } from "./add-settlement-policy/add-settlement-policy.component";
import { ListSettlementPolicyComponent } from "./list-settlement-policy/list-settlement-policy.component";
import { EditSettlementPolicyComponent } from "./edit-settlement-policy/edit-settlement-policy.component";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [
    AddSettlementPolicyComponent,
    ListSettlementPolicyComponent,
    EditSettlementPolicyComponent,
  ],
  imports: [
    CommonModule,
    SettlementPolicyRoutingModule,
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
    MatStepperModule,
    MatTabsModule,
    FlexLayoutModule,
  ],
})
export class SettlementPolicyModule {}
