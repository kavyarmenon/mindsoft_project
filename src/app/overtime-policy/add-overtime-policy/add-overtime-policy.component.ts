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
  selector: "app-add-overtime-policy",
  templateUrl: "./add-overtime-policy.component.html",
  styleUrls: ["./add-overtime-policy.component.css"],
})
export class AddOvertimePolicyComponent implements OnInit {
  overTimePolicy: FormGroup;
  lstCalcBasedOn = [];
  lstParticular = [];
  lstCalcDay = [];
  time: FormControl = new FormControl(null, {
    // updateOn: 'blur',
    // validators: [Validators.required],
  });
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
    this.overTimePolicy = this.formBuilder.group({
      policyName: ["", Validators.required],
      particularId: [null],
      calcBasedOnId: [null, Validators.required],
      calcDayId: [null],
      isRateOnly: [false],
      calcPercentage: null,
      overtimeRate: null,
      workingHour: [null, Validators.required],
    });
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
    console.log(this.overTimePolicy, "overtime");

    if (!this.overTimePolicy.get("policyName").value) {
      this.toastr.error("Enter Policy Name", "Error!");
      return false;
    } else if (!this.overTimePolicy.get("calcBasedOnId").value) {
      this.toastr.error("Select a Calculation Based On", "Error!");
      return false;
    } else if (!this.overTimePolicy.get("workingHour").value) {
      this.toastr.error("Enter a Working Hours", "Error!");
      return false;
    } else {
      let dctData = {
        overtimePolicyId: null,
        overtimePolicyName: this.overTimePolicy.get("policyName").value,
        isCompanyBasedOn: this.overTimePolicy.get("calcDayId").value,
        calculationId: this.overTimePolicy.get("calcBasedOnId").value,
        isCalculationPercentage: null,
        calculationPercentage: this.overTimePolicy.get("calcPercentage").value,
        workingHours: this.overTimePolicy.get("workingHour").value,
        isRateOnly: this.overTimePolicy.get("isRateOnly").value,
        overtimeRate: this.overTimePolicy.get("overtimeRate").value,
        Status: null,
        isSaved: true,
        excludedIDList: this.overTimePolicy.get("particularId").value,
      };

      this.serverService
        .postData("api/OvertimePolicyAPI/createOvertimePolicy/", dctData)
        .subscribe((res: any[]) => {
          swal.fire("Success", "Data Saved Successfully", "success");
          this.router.navigate(["overtime-policy/list-overtime-policy/"]);
        });
    }
  }
  cancel() {}
}
