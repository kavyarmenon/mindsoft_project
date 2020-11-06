import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OnlyNumber } from "./onlynumber.directive";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { OverlayModule } from "@angular/cdk/overlay";
@NgModule({
  declarations: [OnlyNumber],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    OverlayModule,
  ],
  exports: [OnlyNumber],
})
export class SharedModule {}
