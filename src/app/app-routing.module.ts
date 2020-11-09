import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FullComponent } from "./layouts/full/full.component";
import { BlankComponent } from "./layouts/blank/blank.component";

export const Approutes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "",
        redirectTo: "/general-setting/company-info-list",
        pathMatch: "full",
      },
      {
        path: "general-setting",
        loadChildren: () =>
          import("./general-setting/general-setting.module").then(
            (m) => m.GeneralSettingModule
          ),
      },
      {
        path: "leave-policy",
        loadChildren: () =>
          import("./leave-policy/leave-policy.module").then(
            (m) => m.LeavePolicyModule
          ),
      },
      {
        path: "shift-policy",
        loadChildren: () =>
          import("./shift-policy/shift-policy.module").then(
            (m) => m.ShiftPolicyModule
          ),
      },
      {
        path: "settlement-policy",
        loadChildren: () =>
          import("./settlement-policy/settlement-policy.module").then(
            (m) => m.SettlementPolicyModule
          ),
      },
      {
        path: "work-policy",
        loadChildren: () =>
          import("./work-policy/work-policy.module").then(
            (m) => m.WorkPolicyModule
          ),
      },
      {
        path: "proffesional-tax-policy",
        loadChildren: () =>
          import(
            "./proffesional-tax-policy/proffesional-tax-policy.module"
          ).then((m) => m.ProffesionalTaxPolicyModule),
      },
      {
        path: "encash-policy",
        loadChildren: () =>
          import("./encash-policy/encash-policy.module").then(
            (m) => m.EncashPolicyModule
          ),
      },
      {
        path: "overtime-policy",
        loadChildren: () =>
          import("./overtime-policy/overtime-policy.module").then(
            (m) => m.OvertimePolicyModule
          ),
      },
      {
        path: "holiday-policy",
        loadChildren: () =>
          import("./holiday-policy/holiday-policy.module").then(
            (m) => m.HolidayPolicyModule
          ),
      },
      {
        path: "absent-policy",
        loadChildren: () =>
          import("./absent-policy/absent-policy.module").then(
            (m) => m.AbsentPolicyModule
          ),
      },
      {
        path: "pf-policy",
        loadChildren: () =>
          import("./pf-policy/pf-policy.module").then((m) => m.PfPolicyModule),
      },
      {
        path: "deduction-policy",
        loadChildren: () =>
          import("./deduction-policy/deduction-policy.module").then(
            (m) => m.DeductionPolicyModule
          ),
      },
      {
        path: "salary-template",
        loadChildren: () =>
          import("./salary-template/salary-template.module").then(
            (m) => m.SalaryTemplateModule
          ),
      },
      {
        path: "holiday-calendar",
        loadChildren: () =>
          import("./holiday-calendar/holiday-calendar.module").then(
            (m) => m.HolidayCalendarModule
          ),
      },
    ],
  },
];
