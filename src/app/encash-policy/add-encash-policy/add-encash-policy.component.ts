import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import swal from "sweetalert2";
@Component({
  selector: "app-add-encash-policy",
  templateUrl: "./add-encash-policy.component.html",
  styleUrls: ["./add-encash-policy.component.css"],
})
export class AddEncashPolicyComponent implements OnInit {
  encashPolicy: FormGroup;
  lstCalcBasedOn = [];
  lstParticular = [];
  lstCalcDay = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {
    // this.dataSource = new MatTableDataSource(this.lstTableData);
  }
  lstPolicyType = [];
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
      .getData("api/MasterListAPI/PolicyTypeList/")
      .subscribe((res: any[]) => {
        this.lstPolicyType = res["ddlCalcList"];
      });

    this.serverService
      .getData("api/MasterListAPI/ExcludeFromGrossList/")
      .subscribe((res: any[]) => {
        this.lstPolicyType = res["ddlCalcList"];
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
    if (!this.encashPolicy.get("policyName").value) {
      this.toastr.error("Enter Policy Name", "Error!");
      return false;
    } else {
      let dctData = {
        encashPolicyID: null,
        encashPolicyName: this.encashPolicy.get("policyName").value,
        isCompanyBasedOn: this.encashPolicy.get("calcDayId").value,
        calculationBasedOn: this.encashPolicy.get("calcBasedOnId").value,
        calculationPercentage: null,
        isRateOnly: this.encashPolicy.get("isRatePerDay").value,
        encashRate: this.encashPolicy.get("encashRate").value,
        AdditionDeductionID: this.encashPolicy.get("particularId").value,
      };
      this.serverService
        .postData("api/EncashPolicyAPI/Create/", { encashPolicy: dctData })
        .subscribe((res: any[]) => {
          swal.fire("Success", "Data Saved Successfully", "success");
          this.router.navigate(["encash-policy/list-encash-policy/"]);
        });
    }
  }
  cancel() {
    this.router.navigate(["encash-policy/list-encash-policy/"]);
  }
}
