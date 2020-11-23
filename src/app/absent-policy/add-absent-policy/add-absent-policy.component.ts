import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import swal from "sweetalert2";
@Component({
  selector: "app-add-absent-policy",
  templateUrl: "./add-absent-policy.component.html",
  styleUrls: ["./add-absent-policy.component.css"],
})
export class AddAbsentPolicyComponent implements OnInit {
  absentPolicy: FormGroup;
  lstCalcBasedOn = [];
  lstParticular = [];
  lstCalcDay = [];
  policyName;

  mergeParticularId = [];
  mergeCalcBasedOnId;
  mergeCalcDayId;
  mergeIsRateOnly = false;
  mergeCalcPercentage;
  mergeOvertimeRate;
  mergeWorkingHour;
  mergeIsRateBasedOnHour = false;
  mergeHourPerDay;
  mergeRate;
  mergeRateBasedOnHour;

  absentParticularId = [];
  absentCalcBasedOnId;
  absentCalcDayId;
  absentIsRateOnly = false;
  absentCalcPercentage;
  absentOvertimeRate;
  absentWorkingHour;
  absentIsRateBasedOnHour = false;
  absentHourPerDay;
  absentRate;
  absentRateBasedOnHour;
  ismergeBoth = false;
  isAbsentPolicyOnly = "1";
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {
    // this.dataSource = new MatTableDataSource(this.lstTableData);
  }
  ngOnInit(): void {
    this.serverService
      .getData("api/DropDownBindingAPI/ddlCalculationBasedOn/")
      .subscribe((res: any[]) => {
        this.lstCalcBasedOn = res["ddlCalcList"];
      });

    this.serverService
      .getData("api/DropDownBindingAPI/ddlExcludefromGrossSalary/")
      .subscribe((res: any[]) => {
        this.lstParticular = res["particularsList"];
      });

    this.serverService
      .getData("api/DropDownBindingAPI/ddlCalcdayList/")
      .subscribe((res: any[]) => {
        this.lstCalcDay = res["calculationDayList"];
      });
  }
  saveDetail() {
    console.log(this.absentHourPerDay, "time");

    if (!this.policyName) {
      this.toastr.error("Enter Policy Name", "Error!");
      return false;
    } else {
      let dctData = {
        absentPolicyInfo: {
          absentPolicyID: null,
          absentPolicyName: this.policyName,
          isMergeBoth: this.ismergeBoth,
        },
        absentPolicyDetail: [
          {
            calculationID: this.absentCalcDayId,
            isCompanyBasedOn: this.absentCalcBasedOnId,
            isRateOnly: this.absentIsRateOnly,
            absentRate: this.absentRate,
            isRateBasedOnHour: this.absentIsRateBasedOnHour,
            hoursPerDay: JSON.stringify(this.absentHourPerDay),
            absentType: 1,
            isHourBasedShift: null,
            fixedAmount: null,
            percentage: null,
            policyTypeId: null,
            AdditionDeductionId: this.absentParticularId,
          },
          {
            calculationID: this.mergeCalcDayId,
            isCompanyBasedOn: this.mergeCalcBasedOnId,
            isRateOnly: this.mergeIsRateOnly,
            absentRate: this.mergeRate,
            isRateBasedOnHour: this.mergeIsRateBasedOnHour,
            hoursPerDay: JSON.stringify(this.mergeHourPerDay),
            absentType: 2,
            isHourBasedShift: null,
            fixedAmount: null,
            percentage: null,
            policyTypeId: null,
            AdditionDeductionId: this.mergeParticularId,
          },
        ],
      };
      if (this.isAbsentPolicyOnly == "1") {
        dctData.absentPolicyInfo.isMergeBoth = false;
      } else {
        dctData.absentPolicyInfo.isMergeBoth = true;
      }
      this.serverService
        .postData("api/AbsentPolicyAPI/Create/", dctData)
        .subscribe((res: any[]) => {
          swal.fire("Success", "Data Saved Successfully", "success");
          this.router.navigate(["absent-policy/list-absent-policy/"]);
        });
    }
  }
  cancel() {
    this.router.navigate(["absent-policy/list-absent-policy/"]);
  }
}
