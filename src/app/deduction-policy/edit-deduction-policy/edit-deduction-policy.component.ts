import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import * as moment from "moment";
import swal from "sweetalert2";
@Component({
  selector: "app-edit-deduction-policy",
  templateUrl: "./edit-deduction-policy.component.html",
  styleUrls: ["./edit-deduction-policy.component.css"],
})
export class EditDeductionPolicyComponent implements OnInit {
  deductionPolicy: FormGroup;
  lstCalcBasedOn = [];
  lstParticular = [];
  lstDeduction = [];
  lstParameterName = [];
  lstParameterValue = [];
  deductionPolicyID = localStorage.getItem("deductionPolicyID");

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {}
  ngOnInit(): void {
    this.deductionPolicy = this.formBuilder.group({
      particularId: [null],
      deductionPolicyID: [null],
      deductionPolicyName: [null, Validators.required],
      effectFromstr: [null],
      effectFrom: [null],
      deductFrom: [null],
      deductionId: [null],
      basedOn: [null],
      parameterName: [null],
      parameterValue: [null, Validators.required],
      Amount: [null, Validators.required],
      employerContribution: [null, Validators.required],
      employeeContribution: [null, Validators.required],
    });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlCalculationBasedOn/")
      .subscribe((res: any[]) => {
        this.lstCalcBasedOn = res["ddlCalcList"];
      });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlDeductionList/")
      .subscribe((res: any[]) => {
        this.lstDeduction = res["particularsList"];
      });
    this.serverService
      .getData("api/DropDownBindingAPI/parameterValueDDList/")
      .subscribe((res: any[]) => {
        this.lstParameterValue = res["parameterValueList"];
      });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlAdditionList/")
      .subscribe((res: any[]) => {
        this.lstParameterName = res["particularsList"];
      });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlExcludefromGrossSalary/")
      .subscribe((res: any[]) => {
        this.lstParticular = res["particularsList"];
      });

    this.getEditData();
  }
  getEditData() {
    this.serverService
      .getData(
        "api/DeductionPolicyAPI/getDeductionPolicyById/?deductionPolicyID=" +
          this.deductionPolicyID
      )
      .subscribe((res) => {
        this.deductionPolicy
          .get("deductionPolicyName")
          .setValue(res["deductionInfo"]["deductionPolicyName"]);
        this.deductionPolicy
          .get("effectFrom")
          .setValue(res["deductionInfo"]["effectFromstr"]);
        this.deductionPolicy
          .get("deductionId")
          .setValue(res["deductionInfo"]["deductionId"]);
        this.deductionPolicy
          .get("basedOn")
          .setValue(res["deductionInfo"]["basedOn"]);
        this.deductionPolicy
          .get("parameterName")
          .setValue(res["deductionInfo"]["parameterName"]);
        this.deductionPolicy
          .get("parameterValue")
          .setValue(res["deductionInfo"]["parameterValue"]);
        this.deductionPolicy
          .get("Amount")
          .setValue(res["deductionInfo"]["Amount"]);
        this.deductionPolicy
          .get("employerContribution")
          .setValue(res["deductionInfo"]["employerContribution"]);
        this.deductionPolicy
          .get("employeeContribution")
          .setValue(res["deductionInfo"]["employeeContribution"]);
        this.deductionPolicy
          .get("particularId")
          .setValue(res["deductionInfo"]["AdditionDeductionID"]);
      });
  }
  saveDetail() {
    if (this.deductionPolicy.invalid) {
      console.log("invalid", this.deductionPolicy);
      return;
    }

    let dctData = {
      deductionPolicyID: this.deductionPolicyID,
      deductionPolicyName: this.deductionPolicy.get("deductionPolicyName")
        .value,
      effectFromstr: this.deductionPolicy.get("effectFrom").value,
      effectFrom: moment(this.deductionPolicy.get("effectFrom").value)
        .format("DD/MM/YYYY")
        .toString(),
      deductionId: this.deductionPolicy.get("deductionId").value,
      basedOn: this.deductionPolicy.get("basedOn").value,
      parameterName: this.deductionPolicy.get("parameterName").value,
      parameterValue: this.deductionPolicy.get("parameterValue").value,
      Amount: this.deductionPolicy.get("Amount").value,
      employerContribution: this.deductionPolicy.get("employerContribution")
        .value,
      employeeContribution: this.deductionPolicy.get("employeeContribution")
        .value,
      AdditionDeductionID: this.deductionPolicy.get("particularId").value,
    };

    this.serverService
      .postData("api/DeductionPolicyAPI/Create/", dctData)
      .subscribe((res: any[]) => {
        swal.fire("Success", "Data Saved Successfully", "success");
        this.router.navigate(["deduction-policy/list-deduction-policy/"]);
      });
  }
  cancel() {
    this.router.navigate(["deduction-policy/list-deduction-policy/"]);
  }
}
