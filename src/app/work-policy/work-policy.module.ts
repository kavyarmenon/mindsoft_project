import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WorkPolicyRoutingModule } from "./work-policy-routing.module";
import { AddWorkPolicyComponent } from "./add-work-policy/add-work-policy.component";
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
import { ListWorkPolicyComponent } from './list-work-policy/list-work-policy.component';
import { EditWorkPolicyComponent } from './edit-work-policy/edit-work-policy.component';

@NgModule({
  declarations: [AddWorkPolicyComponent, ListWorkPolicyComponent, EditWorkPolicyComponent],
  imports: [
    CommonModule,
    WorkPolicyRoutingModule,
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
export class WorkPolicyModule {}
