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
    ],
  },
];
