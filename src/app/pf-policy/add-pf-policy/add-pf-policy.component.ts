import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import swal from "sweetalert2";
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
      particularId: [null],
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

    let dctData = {
      pfPolicyID: null,
      pfPolicyName: this.pfPolicy.get("pfPolicyName").value,
      effectFrom: this.pfPolicy.get("effectFrom").value,
      deductFrom: this.pfPolicy.get("deductFrom").value,
      fixedAmount: this.pfPolicy.get("fixedAmount").value,
      parameterName: this.pfPolicy.get("parameterName").value,
      parameterValue: this.pfPolicy.get("parameterValue").value,
      Amount: this.pfPolicy.get("Amount").value,
      rateOnly: this.pfPolicy.get("rateOnly").value,
      employerContribution: this.pfPolicy.get("employerContribution").value,
      employeeContribution: this.pfPolicy.get("employeeContribution").value,
      epsEmployer: this.pfPolicy.get("epsEmployer").value,
      edli: this.pfPolicy.get("edli").value,
      epfAdmin: this.pfPolicy.get("epfAdmin").value,
      edliAdmin: this.pfPolicy.get("edliAdmin").value,
    };
    console.log("click save");

    this.serverService
      .postData("api/PFPolicyAPI/Create/", dctData)
      .subscribe((res: any[]) => {
        swal.fire("Success", "Data Saved Successfully", "success");
        this.router.navigate(["pf-policy/list-pf-policy/"]);
      });
  }
  cancel() {}
}
