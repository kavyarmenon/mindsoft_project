import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import * as moment from "moment";
import swal from "sweetalert2";
@Component({
  selector: "app-add-deduction-policy",
  templateUrl: "./add-deduction-policy.component.html",
  styleUrls: ["./add-deduction-policy.component.css"],
})
export class AddDeductionPolicyComponent implements OnInit {
  deductionPolicy: FormGroup;
  lstCalcBasedOn = [];
  lstParticular = [];
  lstDeduction = [];
  lstParameterName = [];
  lstParameterValue = [];

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
  }
  saveDetail() {
    if (this.deductionPolicy.invalid) {
      console.log("invalid", this.deductionPolicy);
      return;
    }

    let dctData = {
      deductionPolicyID: null,
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
    };

    this.serverService
      .postData("api/DeductionPolicyAPI/Create/", dctData)
      .subscribe((res: any[]) => {
        swal.fire("Success", "Data Saved Successfully", "success");
        this.router.navigate(["deduction-policy/list-deduction-policy/"]);
      });
  }
  cancel() {}
}
