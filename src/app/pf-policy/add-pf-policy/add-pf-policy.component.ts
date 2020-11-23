import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import swal from "sweetalert2";
import * as moment from "moment";

@Component({
  selector: "app-add-pf-policy",
  templateUrl: "./add-pf-policy.component.html",
  styleUrls: ["./add-pf-policy.component.css"],
})
export class AddPfPolicyComponent implements OnInit {
  pfPolicy: FormGroup;
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
    this.pfPolicy = this.formBuilder.group({
      particularId: [],
      calcBasedOnId: [null],
      pfPolicyID: [null],
      pfPolicyName: [null, Validators.required],
      effectFrom: [null],
      deductFrom: ["particular"],
      deductionId: [null],
      fixedAmount: [null],
      parameterName: [null],
      parameterValue: [null, Validators.required],
      Amount: [null, Validators.required],
      rateOnly: [null],
      employerContribution: [null, Validators.required],
      employeeContribution: [null, Validators.required],
      epsEmployer: [null, Validators.required],
      edli: [null, Validators.required],
      epfAdmin: [null, Validators.required],
      edliAdmin: [null, Validators.required],
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
        this.lstDeduction.forEach((element) => {
          if (element.particulars === "PF") {
            this.pfPolicy
              .get("deductionId")
              .setValue(element.additionDeductionId);
          }
        });
      });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlExcludefromGrossSalary/")
      .subscribe((res: any[]) => {
        this.lstParticular = res["particularsList"];
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
    let hasError = false;
    if (this.pfPolicy.invalid) {
      console.log("invalid", this.pfPolicy);
      return;
    }

    let dctData = {};
    dctData["pfPolicyDet"] = this.pfPolicy.get("particularId").value;
    dctData["pfPolicy"] = {
      pfPolicyID: null,
      pfPolicyName: this.pfPolicy.get("pfPolicyName").value,
      effectFrom: moment(this.pfPolicy.get("effectFrom").value)
        .format("DD/MM/YYYY")
        .toString(),
      deductFrom: Number(this.pfPolicy.get("deductFrom").value),
      fixedAmount: Number(this.pfPolicy.get("fixedAmount").value),
      parameterName: Number(this.pfPolicy.get("parameterName").value),
      parameterValue: Number(this.pfPolicy.get("parameterValue").value),
      Amount: Number(this.pfPolicy.get("Amount").value),
      rateOnly: Number(this.pfPolicy.get("rateOnly").value),
      employerContribution: Number(
        this.pfPolicy.get("employerContribution").value
      ),
      employeeContribution: Number(
        this.pfPolicy.get("employeeContribution").value
      ),
      epsEmployer: Number(this.pfPolicy.get("epsEmployer").value),
      edli: Number(this.pfPolicy.get("edli").value),
      epfAdmin: Number(this.pfPolicy.get("epfAdmin").value),
      edliAdmin: Number(this.pfPolicy.get("edliAdmin").value),
      deduction: Number(this.pfPolicy.get("deductionId").value),
    };
    console.log("click save");

    this.serverService
      .postData("api/PFPolicyAPI/Create/", dctData)
      .subscribe((res: any[]) => {
        swal.fire("Success", "Data Saved Successfully", "success");
        this.router.navigate(["pf-policy/list-pf-policy/"]);
      });
  }
  cancel() {
    this.router.navigate(["pf-policy/list-pf-policy/"]);
  }
}
