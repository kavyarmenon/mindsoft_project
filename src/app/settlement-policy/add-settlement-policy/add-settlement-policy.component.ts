import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ServerService } from "src/app/server.service";
import swal from "sweetalert2";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-add-settlement-policy",
  templateUrl: "./add-settlement-policy.component.html",
  styleUrls: ["./add-settlement-policy.component.css"],
})
export class AddSettlementPolicyComponent implements OnInit {
  lstGreaterThanNormal = [
    {
      parameter: null,
      noOfMonth: null,
      noOfDays: null,
    },
  ];
  lstLessThanNormal = [
    {
      parameter: null,
      noOfMonth: null,
      noOfDays: null,
    },
  ];
  lstGreaterThanTermination = [
    {
      parameter: null,
      noOfMonth: null,
      noOfDays: null,
    },
  ];
  lstLessThanTermination = [
    {
      parameter: null,
      noOfMonth: null,
      noOfDays: null,
    },
  ];
  particularsId;
  lstCalcBasedOn = [];
  lstParticular = [];
  lstCalcDay = [];
  lstParameter = [];
  selectedIndexOfNormal = 0;
  selectedIndexOfTermination = 0;

  isFillTab1 = true;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public router: Router,
    private toastr: ToastrService,
    private serverService: ServerService
  ) {
    // this.dataSource = new MatTableDataSource(this.lstTableData);
  }
  policyName: "";

  calcBasedOnTermination: null;
  calcDayTermination: null;
  isLessThanFiveTermination: false;
  isIncludeEligibleLeaveTermination: false;

  calcBasedOnNormal: null;
  calcDayNormal: null;
  isLessThanFiveNormal: false;
  isIncludeEligibleLeaveNormal: false;

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

    this.serverService
      .getData("api/DropDownBindingAPI/parameterValueDDList/")
      .subscribe((res: any[]) => {
        this.lstParameter = res["parameterValueList"];
      });
  }

  addRow(mainType, subType) {
    console.log(mainType, subType, "mainType, subType");
    let dctInitialValue = {
      parameter: null,
      noOfMonth: null,
      noOfDays: null,
    };
    if (mainType == "normal") {
      if (subType == "lessThan") {
        this.lstLessThanNormal.push(dctInitialValue);
      } else if (subType == "greaterThan") {
        this.lstGreaterThanNormal.push(dctInitialValue);
      }
    } else if (mainType == "termination") {
      if (subType == "lessThan") {
        this.lstLessThanTermination.push(dctInitialValue);
      } else if (subType == "greaterThan") {
        this.lstGreaterThanTermination.push(dctInitialValue);
      }
    }
  }

  deleteRow(index: number, mainType, subType) {
    console.log(mainType, subType, "mainType, subType");

    if (mainType == "normal") {
      if (subType == "lessThan") {
        this.lstLessThanNormal.splice(index, 1);
      } else if (subType == "greaterThan") {
        this.lstGreaterThanNormal.splice(index, 1);
      }
    } else if (mainType == "termination") {
      if (subType == "lessThan") {
        this.lstLessThanTermination.splice(index, 1);
      } else if (subType == "greaterThan") {
        this.lstGreaterThanTermination.splice(index, 1);
      }
    }
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent, type): void {
    if (type == "normal") {
      this.selectedIndexOfNormal = tabChangeEvent.index;
    } else {
      this.selectedIndexOfTermination = tabChangeEvent.index;
    }
  }
  public nextStepOfMatTab(type) {
    if (type === "normal") {
      let isValid = true;
      if (!this.policyName) {
        this.toastr.error("Enter a Policy Name", "Error!");
        this.isFillTab1 = false;
        isValid = false;
        return false;
      } else if (!this.calcBasedOnNormal) {
        this.toastr.error("Select a Calculation Based on", "Error!");
        this.isFillTab1 = false;
        isValid = false;
        return false;
      } else if (!this.calcDayNormal) {
        this.toastr.error("Select a Calculation Day", "Error!");
        this.isFillTab1 = false;
        isValid = false;
        return false;
      }
      for (let i = 0; i < this.lstLessThanNormal.length; i++) {
        let rowNo = i + 1;
        if (this.lstLessThanNormal[i].parameter === null) {
          this.toastr.error("Select a Parameter For Row " + rowNo, "Error!");
          this.isFillTab1 = false;
          isValid = false;
          break;
        } else if (this.lstLessThanNormal[i].noOfDays === null) {
          this.toastr.error("Select a No of Days For Row " + rowNo, "Error!");
          this.isFillTab1 = false;
          isValid = false;
          break;
        } else if (this.lstLessThanNormal[i].noOfMonth === null) {
          this.toastr.error("Select a No of Months For Row " + rowNo, "Error!");
          this.isFillTab1 = false;
          isValid = false;
          break;
        }
      }
      if (isValid) {
        this.isFillTab1 = false;
        this.selectedIndexOfNormal += 1;
      }
    } else if (type === "termination") {
      let isValid = true;
      for (let i = 0; i < this.lstLessThanTermination.length; i++) {
        let rowNo = i + 1;
        if (this.lstLessThanTermination[i].parameter === null) {
          this.toastr.error("Select a Parameter For Row " + rowNo, "Error!");
          this.isFillTab1 = false;
          isValid = false;
          break;
        } else if (this.lstLessThanTermination[i].noOfDays === null) {
          this.toastr.error("Select a No of Days For Row " + rowNo, "Error!");
          this.isFillTab1 = false;
          isValid = false;
          break;
        } else if (this.lstLessThanTermination[i].noOfMonth === null) {
          this.toastr.error("Select a No of Months For Row " + rowNo, "Error!");
          this.isFillTab1 = false;
          isValid = false;
          break;
        }
      }
      if (isValid) {
        this.isFillTab1 = false;
        this.selectedIndexOfTermination += 1;
      }
    }
  }

  public previousStep(type) {
    if (type == "normal") {
      this.selectedIndexOfNormal -= 1;
    } else if (type == "termination") {
      this.selectedIndexOfTermination -= 1;
    }
  }
  nextStepOfStepper(stepper: MatStepper, type) {
    if (type === "normal") {
      let isValid = true;
      if (!this.calcBasedOnTermination) {
        this.toastr.error("Select a Calculation Based on", "Error!");
        this.isFillTab1 = false;
        isValid = false;
        return false;
      } else if (!this.calcDayTermination) {
        this.toastr.error("Select a Calculation Day", "Error!");
        this.isFillTab1 = false;
        isValid = false;
        return false;
      }
      for (let i = 0; i < this.lstGreaterThanNormal.length; i++) {
        let rowNo = i + 1;
        if (this.lstGreaterThanNormal[i].parameter === null) {
          this.toastr.error("Select a Parameter For Row " + rowNo, "Error!");
          // this.isFillTab1 = false;
          isValid = false;
          break;
        } else if (this.lstGreaterThanNormal[i].noOfDays === null) {
          this.toastr.error("Select a No of Days For Row " + rowNo, "Error!");
          // this.isFillTab1 = false;
          isValid = false;
          break;
        } else if (this.lstGreaterThanNormal[i].noOfMonth === null) {
          this.toastr.error("Select a No of Months For Row " + rowNo, "Error!");
          // this.isFillTab1 = false;
          isValid = false;
          break;
        }
      }
      if (isValid) {
        stepper.next();
      }
    } else if (type === "termination") {
      let isValid = true;
      for (let i = 0; i < this.lstGreaterThanTermination.length; i++) {
        let rowNo = i + 1;
        if (this.lstGreaterThanTermination[i].parameter === null) {
          this.toastr.error("Select a Parameter For Row " + rowNo, "Error!");
          // this.isFillTab1 = false;
          isValid = false;
          break;
        } else if (this.lstGreaterThanTermination[i].noOfDays === null) {
          this.toastr.error("Select a No of Days For Row " + rowNo, "Error!");
          // this.isFillTab1 = false;
          isValid = false;
          break;
        } else if (this.lstGreaterThanTermination[i].noOfMonth === null) {
          this.toastr.error("Select a No of Months For Row " + rowNo, "Error!");
          // this.isFillTab1 = false;
          isValid = false;
          break;
        }
      }
      if (isValid) {
        this.saveUserDetails();
      }
    }
  }
  saveUserDetails() {
    console.log("save data");
    let dctSaveDetails = {
      Status: "",
      gratuityMaster: {
        gratuityPolicyId: null,
        description: this.policyName,
        calculationIdNormal: this.calcDayNormal,
        isIncludeLeaveNormal: this.isIncludeEligibleLeaveNormal,
        isCompanyBasedOnNormal: this.calcBasedOnNormal,
        calculationIdTerminal: this.calcDayTermination,
        isIncludeLeaveterminal: this.isIncludeEligibleLeaveTermination,
        isCompanyBasedOnTerminal: this.calcBasedOnTermination,
        calculationIdProvision: null,
        isIncludeLeaveProvision: null,
        isCompanyBasedOnProvision: null,
        isSaved: true,
        Status: null,
      },
      gratuityPolicyList: [],
      gratuityPolicyFiveYr: [],
      gratuityPolicyTer: [],
      gratuityPolicyFiveYrTer: [],
    };
    //Normal
    this.lstLessThanNormal.forEach((element) => {
      let dctData = {};
      dctData["particularsId"] = element.parameter;
      dctData["noOfMonths"] = element.noOfMonth;
      dctData["noOfDays"] = element.noOfDays;
      dctData["FiveYearType"] = 1;
      // dctData['gratuityPolicyDetId']=null
      // dctData['DtlsId']=null
      dctSaveDetails.gratuityPolicyList.push(dctData);
    });
    this.lstGreaterThanNormal.forEach((element) => {
      let dctData = {};
      dctData["particularsId"] = element.parameter;
      dctData["noOfMonths"] = element.noOfMonth;
      dctData["noOfDays"] = element.noOfDays;
      dctData["FiveYearType"] = 2;
      // dctData['gratuityPolicyDetId']=null
      // dctData['DtlsId']=null
      dctSaveDetails.gratuityPolicyFiveYr.push(dctData);
    });

    // termination

    this.lstLessThanTermination.forEach((element) => {
      let dctData = {};
      dctData["particularsId"] = element.parameter;
      dctData["noOfMonths"] = element.noOfMonth;
      dctData["noOfDays"] = element.noOfDays;
      dctData["FiveYearType"] = 1;
      // dctData['gratuityPolicyDetId']=null
      // dctData['DtlsId']=null
      dctSaveDetails.gratuityPolicyTer.push(dctData);
    });

    this.lstGreaterThanTermination.forEach((element) => {
      let dctData = {};
      dctData["particularsId"] = element.parameter;
      dctData["noOfMonths"] = element.noOfMonth;
      dctData["noOfDays"] = element.noOfDays;
      dctData["FiveYearType"] = 2;
      // dctData['gratuityPolicyDetId']=null
      // dctData['DtlsId']=null
      dctSaveDetails.gratuityPolicyFiveYrTer.push(dctData);
    });

    this.serverService
      .postData("api/GratuityPolicyAPI/createGratuityPolicy/", dctSaveDetails)
      .subscribe((res: any[]) => {
        if (res["Status"]) {
          swal.fire("Success", "Data Saved Successfully", "success");
          this.router.navigate(["work-policy/list-work-policy/"]);
        }
      });
  }
}
