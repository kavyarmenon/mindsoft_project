import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import swal from "sweetalert2";
@Component({
  selector: "app-edit-encash-policy",
  templateUrl: "./edit-encash-policy.component.html",
  styleUrls: ["./edit-encash-policy.component.css"],
})
export class EditEncashPolicyComponent implements OnInit {
  encashPolicy: FormGroup;
  lstCalcBasedOn = [];
  lstParticular = [];
  lstCalcDay = [];
  encashPolicyID = localStorage.getItem("encashPolicyID");

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
    this.encashPolicy = this.formBuilder.group({
      policyName: ["", Validators.required],
      particularId: [null],
      calcBasedOnId: [null],
      calcDayId: [null],
      encashRate: [null],
      isRatePerDay: [false],
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
    this.getEditData();
  }
  getEditData() {
    this.serverService
      .getData(
        "api/EncashPolicyAPI/getEncashPolicyById?encashPolicyID=" +
          this.encashPolicyID
      )
      .subscribe((res) => {
        this.encashPolicy
          .get("policyName")
          .setValue(res["encashPolicy"]["encashPolicyName"]);
        this.encashPolicy
          .get("calcDayId")
          .setValue(res["encashPolicy"]["isCompanyBasedOn"]);
        this.encashPolicy
          .get("calcBasedOnId")
          .setValue(res["encashPolicy"]["calculationBasedOn"]);
        this.encashPolicy
          .get("isRatePerDay")
          .setValue(res["encashPolicy"]["isRateOnly"]);
        this.encashPolicy
          .get("encashRate")
          .setValue(res["encashPolicy"]["encashRate"]);
      });
  }
  saveDetail() {
    if (!this.encashPolicy.get("policyName").value) {
      this.toastr.error("Enter Policy Name", "Error!");
      return false;
    } else {
      let dctData = {
        encashPolicyID: this.encashPolicyID,
        encashPolicyName: this.encashPolicy.get("policyName").value,
        isCompanyBasedOn: this.encashPolicy.get("calcDayId").value,
        calculationBasedOn: this.encashPolicy.get("calcBasedOnId").value,
        calculationPercentage: null,
        isRateOnly: this.encashPolicy.get("isRatePerDay").value,
        encashRate: this.encashPolicy.get("encashRate").value,
      };
      this.serverService
        .postData("api/EncashPolicyAPI/Create/", dctData)
        .subscribe((res: any[]) => {
          swal.fire("Success", "Data Saved Successfully", "success");
          this.router.navigate(["encash-policy/list-encash-policy/"]);
        });
    }
  }
  cancel() {}
}
