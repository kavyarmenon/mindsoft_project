import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralSettingRoutingModule } from './general-setting-routing.module';
import { CompanyInformationComponent } from './company-information/company-information.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CompanyInfoListComponent } from './company-info-list/company-info-list.component'; 

@NgModule({
  declarations: [CompanyInformationComponent, CompanyInfoListComponent],
  imports: [
    CommonModule,
    GeneralSettingRoutingModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatCheckboxModule
    

  ],
  providers: [  
    MatDatepickerModule,  
  ],
})
export class GeneralSettingModule { }
