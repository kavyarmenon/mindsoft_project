import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import { MatTabChangeEvent } from "@angular/material/tabs";
import swal from "sweetalert2";
@Component({
  selector: "app-add-salary-template",
  templateUrl: "./add-salary-template.component.html",
  styleUrls: ["./add-salary-template.component.css"],
})
export class AddSalaryTemplateComponent implements OnInit {
  selectedIndex = 0;
  isFillTab1 = true;
  name;
  absentPolicy;
  overTimePolicy;
  holidayPolicy;
  encashPolicy;
  lstDeduction = [];
  lstDeductionPolicy = [];
  lstAbsentPolicy = [];
  lstOverTimePolicy = [];
  lstHolidayPolicy = [];
  lstEncashPolicy = [];
  lstAdditionDetails = [
    {
      particularId: null,
      particularName: "",
      percentage: null,
    },
  ];
  lstDeductionDetails = [
    {
      particularId: null,
      particularName: "",
      percentage: null,
      deductionPolicyId: null,
      deductionPolicyName: "",
    },
  ];
  lstParticular = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {}

  ngOnInit(): void {
    this.serverService
      .getData("api/DropDownBindingAPI/ddlAbsentPolicy/")
      .subscribe((res: any[]) => {
        this.lstAbsentPolicy = res["absentPolicyList"];
      });

    this.serverService
      .getData("api/DropDownBindingAPI/ddlEncashPolicy/")
      .subscribe((res: any[]) => {
        this.lstEncashPolicy = res["encashPolicyList"];
      });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlDeductionList/")
      .subscribe((res: any[]) => {
        this.lstDeduction = res["particularsList"];
      });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlOvertimePolicy/")
      .subscribe((res: any[]) => {
        this.lstOverTimePolicy = res["overtimePolicyList"];
      });

    this.serverService
      .getData("api/DropDownBindingAPI/ddlHolidayPolicy/")
      .subscribe((res: any[]) => {
        this.lstHolidayPolicy = res["holidayPolicyList"];
      });
    this.serverService
      .getData("api/DropDownBindingAPI/ddlExcludefromGrossSalary/")
      .subscribe((res: any[]) => {
        this.lstParticular = res["particularsList"];
      });
  }
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }

  changeParticular(row) {
    this.serverService
      .getData(
        "api/DropDownBindingAPI/ddlDeductionPolicyList?DeductionID=" +
          row.particularId
      )
      .subscribe((res: any[]) => {
        this.lstDeductionPolicy = res["deductionPolicyList"];
      });
  }
  public nextStep() {
    let isValid = true;
    if (!this.name) {
      this.toastr.error("Enter Policy Name", "Error!");
      return false;
    } else {
      this.lstAdditionDetails.forEach((element, index) => {
        let row = index + 1;
        if (!element.particularId) {
          this.toastr.error("Choose a particular for row " + row, "Error!");
          isValid = false;
          return false;
        } else if (!element.percentage) {
          this.toastr.error("Enter Percentage for row " + row, "Error!");
          isValid = false;
          return false;
        }
      });
      if (isValid) {
        this.isFillTab1 = false;
        this.selectedIndex += 1;
      }
    }
  }

  public previousStep() {
    this.selectedIndex -= 1;
  }
  addRow(index, type) {
    let dctData = {
      particularId: null,
      particularName: "",
      percentage: null,
      deductionPolicyId: null,
      deductionPolicyName: "",
    };
    if (type == "addition") {
      this.lstAdditionDetails.push(dctData);
    } else {
      this.lstDeductionDetails.push(dctData);
    }
  }
  deleteRow(index, type) {
    if (type == "addition") {
      this.lstAdditionDetails.splice(index, 1);
    } else {
      this.lstDeductionDetails.splice(index, 1);
    }
  }
  saveDetail() {
    let isValid = true;
    this.lstDeductionDetails.forEach((element, index) => {
      let row = index + 1;
      if (!element.particularId) {
        this.toastr.error("Choose a particular for row " + row, "Error!");
        isValid = false;
        return false;
      } else if (!element.percentage) {
        this.toastr.error("Enter Percentage for row " + row, "Error!");
        isValid = false;
        return false;
      }
    });
    let dctData = {
      salaryTemplateInfo: {
        templateID: null,
        templateName: this.name,
        encashPolicyID: this.encashPolicy,
        holidayPolicyID: this.holidayPolicy,
        overtimePolicyID: this.overTimePolicy,
        absentPolicyID: this.absentPolicy,
      },
      additionList: [],
      deductionList: [],
    };
    this.lstAdditionDetails.forEach((element) => {
      let dct = {};
      dct["SalaryTemplateParticularsID"] = element.particularId;
      dct["SalaryTemplatePercentage"] = Number(element.percentage);
      dctData.additionList.push(dct);
    });
    this.lstDeductionDetails.forEach((element) => {
      let dct = {};
      dct["SalaryTemplateParticularsDedID"] = element.particularId;
      dct["Amount"] = Number(element.percentage);
      dct["PolicyID"] = element.deductionPolicyId;

      dctData.deductionList.push(dct);
    });

    if (isValid) {
      this.serverService
        .postData("api/SalaryTemplateAPI/Create/", dctData)
        .subscribe((res: any[]) => {
          // if (res["Status"]) {
          swal.fire("Success", "Data Saved Successfully", "success");
          this.router.navigate(["salary-template/list-salary-template/"]);
          // }
        });
    }
  }
}
