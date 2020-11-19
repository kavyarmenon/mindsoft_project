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
  selector: "app-edit-absent-policy",
  templateUrl: "./edit-absent-policy.component.html",
  styleUrls: ["./edit-absent-policy.component.css"],
})
export class EditAbsentPolicyComponent implements OnInit {
  absentPolicy: FormGroup;
  lstCalcBasedOn = [];
  lstParticular = [];
  lstCalcDay = [];
  policyName;

  mergeParticularId;
  mergeCalcBasedOnId;
  mergeCalcDayId;
  mergeIsRateOnly = false;
  mergeCalcPercentage;
  mergeOvertimeRate;
  mergeWorkingHour;
  mergeIsRateBasedOnHour = false;
  mergeHourPerDay;
  mergeRate;
  absentPolicyID = localStorage.getItem("absentPolicyID");

  absentParticularId;
  absentCalcBasedOnId;
  absentCalcDayId;
  absentIsRateOnly = false;
  absentCalcPercentage;
  absentOvertimeRate;
  absentWorkingHour;
  absentIsRateBasedOnHour = false;
  absentHourPerDay;
  absentRate;

  ismergeBoth = false;
  isAbsentPolicyOnly = false;
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
    this.getEditData();
  }
  getEditData() {
    this.serverService
      .getData(
        "api/AbsentPolicyAPI/getAbsentPolicyById?absentPolicyID=" +
          this.absentPolicyID
      )
      .subscribe((res) => {
        this.absentPolicyID = res["absentPolicyInfo"]["absentPolicyID"];
        this.policyName = res["absentPolicyInfo"]["absentPolicyName"];
        this.ismergeBoth = res["absentPolicyInfo"]["isMergeBoth"];

        this.absentCalcDayId = res["absentPolicyDetail"][0]["calculationID"];
        this.absentCalcBasedOnId =
          res["absentPolicyDetail"][0]["isCompanyBasedOn"];
        this.absentIsRateOnly = res["absentPolicyDetail"][0]["isRateOnly"];
        this.absentParticularId =
          res["absentPolicyDetail"][0]["AdditionDeductionId"];

        this.absentRate = res["absentPolicyDetail"][0]["absentRate"];
        this.absentIsRateBasedOnHour =
          res["absentPolicyDetail"][0]["isRateBasedOnHour"];
        this.absentHourPerDay = res["absentPolicyDetail"][0]["hoursPerDay"];
        this.absentIsRateBasedOnHour =
          res["absentPolicyDetail"][0]["isHourBasedShift"];
        // res['absentPolicyDetail']['fixedAmount']: null,
        this.absentCalcPercentage = res["absentPolicyDetail"][0]["percentage"];
        if (res["absentPolicyDetail"].length > 1) {
          this.mergeCalcDayId = res["absentPolicyDetail"][1]["calculationID"];
          this.mergeCalcBasedOnId =
            res["absentPolicyDetail"][1]["isCompanyBasedOn"];
          this.mergeParticularId =
            res["absentPolicyDetail"][1]["AdditionDeductionId"];
          this.mergeIsRateOnly = res["absentPolicyDetail"][1]["isRateOnly"];
          this.mergeRate = res["absentPolicyDetail"][1]["absentRate"];
          this.mergeIsRateBasedOnHour =
            res["absentPolicyDetail"][1]["isRateBasedOnHour"];
          this.mergeHourPerDay = res["absentPolicyDetail"][1]["hoursPerDay"];
          // =res['absentPolicyDetail']['absentType'] 2
          this.mergeIsRateBasedOnHour =
            res["absentPolicyDetail"][1]["isHourBasedShift"];
        }
      });
  }
  saveDetail() {
    if (!this.policyName) {
      this.toastr.error("Enter Policy Name", "Error!");
      return false;
    } else if (!this.absentCalcBasedOnId) {
      this.toastr.error("Select a Calculation Based On", "Error!");
      return false;
    } else {
      let dctData = {
        absentPolicyInfo: {
          absentPolicyID: this.absentPolicyID,
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
