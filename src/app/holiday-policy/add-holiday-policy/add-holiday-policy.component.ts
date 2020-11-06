import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import swal from "sweetalert2";
@Component({
  selector: "app-add-holiday-policy",
  templateUrl: "./add-holiday-policy.component.html",
  styleUrls: ["./add-holiday-policy.component.css"],
})
export class AddHolidayPolicyComponent implements OnInit {
  holidayPolicy: FormGroup;
  lstCalcBasedOn = [];
  lstParticular = [];
  lstCalcDay = [];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {}
  ngOnInit(): void {
    this.holidayPolicy = this.formBuilder.group({
      policyName: ["", Validators.required],
      particularId: [null],
      calcBasedOnId: [null, Validators.required],
      calcDayId: [null],
      isHourPerDay: [false],
      calcPercentage: null,
      isHolidayRate: [false],
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
    if (!this.holidayPolicy.get("policyName").value) {
      this.toastr.error("Enter Policy Name", "Error!");
      return false;
    } else if (!this.holidayPolicy.get("calcBasedOnId").value) {
      this.toastr.error("Select a Calculation Based On", "Error!");
      return false;
    } else {
      let dctData = {
        holidayPolicyID: null,
        holidayPolicyName: this.holidayPolicy.get("policyName").value,
        isCompanyBasedOn: this.holidayPolicy.get("calcDayId").value,
        isRateBasedOnHour: null,
        hoursPerDay: this.holidayPolicy.get("isHourPerDay").value,
        calculationBasedOn: this.holidayPolicy.get("calcBasedOnId").value,
        calculationPercentage: this.holidayPolicy.get("calcPercentage").value,
        isRateOnly: null,
        holidayRate: this.holidayPolicy.get("isHolidayRate").value,
      };

      this.serverService
        .postData("api/HolidayPolicyAPI/Create/", dctData)
        .subscribe((res: any[]) => {
          swal.fire("Success", "Data Saved Successfully", "success");
          this.router.navigate(["holiday-policy/list-holiday-policy/"]);
        });
    }
  }
  cancel() {}
}
